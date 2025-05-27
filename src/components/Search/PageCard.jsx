import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/PageCard.css"
import TurnOverIcon from '../../assets/SharedAssets/TurnOverIcon';
export default function PageCard({data}) {
  const [isTransformed, setIsTransformed] = useState(false);
  
  const isDoubleFaced = ['transform', 'modal_dfc', 'double_faced_token', 'reversible_card', 'art_series'].includes(data.layout);
  const navigate = useNavigate();

  async function handleClick(data) {
    try {
      const setResponse = await fetch(`https://api.scryfall.com/sets/${data.set}`)
      const setData = await setResponse.json();

      navigate(`/card/${data.set}/${data.collector_number}`, {
        state: { cardData: { ...data, symbolUri: setData.icon_svg_uri } }
      });
    } catch (error) {
      console.error('Failed to fetch related card:', error);
    }
  }

  /** Shows the back face of the card */
  function handleTransform() {
    setIsTransformed(!isTransformed);
  }

  if (isDoubleFaced && data.card_faces) {
    const [front, back] = data.card_faces;

    return (
    <div className="gallery-wrapper">
      <div className={`gallery ${isTransformed ? 'transform' : ''}`} onClick={() => {if (data.layout !== 'art_series') handleClick(data)}}>
        <img className="gallery-img front" src={front.image_uris.normal} alt={front.name} />
        <img className="gallery-img back" src={back.image_uris.normal} alt={back.name} />
      </div>
      <button className="gallery-btn" onClick={handleTransform}>
        <TurnOverIcon />
      </button>
    </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      <img
        className="gallery-img"
        src={data.image_uris?.normal}
        alt={data.name}
        onClick={() => handleClick(data)}
      />
    </div>
  );
}