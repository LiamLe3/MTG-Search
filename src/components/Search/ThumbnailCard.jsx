import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/ThumbnailCard.css"
import TurnOverIcon from '../../assets/SharedAssets/TurnOverIcon';

const DOUBLE_FACED_LAYOUTS = ['transform', 'modal_dfc', 'double_faced_token', 'reversible_card', 'art_series'];
export default function ThumbnailCard({data: card}) {
  const { layout, card_faces, set, collector_number, image_uris, name } = card;
  const [isTransformed, setIsTransformed] = useState(false);
  
  const isDoubleFaced = DOUBLE_FACED_LAYOUTS.includes(layout);
  const navigate = useNavigate();

  /** Handles click interaction on a card.
   * If it is an art series card then ignore the click.
   * Otherwise fetches for the set symbol and navigates to details page of the card
   */
  async function handleCardClick() {
    if(layout === 'art_series') return;

    try {
      const setResponse = await fetch(`https://api.scryfall.com/sets/${set}`)
      const setData = await setResponse.json();

      navigate(`/card/${set}/${collector_number}`, {
        state: { cardData: { ...card, symbolUri: setData.icon_svg_uri } }
      });
    } catch (error) {
      console.error('Failed to fetch related card:', error);
    }
  }

  /** Toggles the view between the front and back face of double-faced cards */
  function handleTransform() {
    setIsTransformed(prev => !prev);
  }

  /** Rendering for double-faced cards */
  if (isDoubleFaced && card_faces) {
    const [front, back] = card_faces;

    return (
    <div className="thumbnail-wrapper">
      <div className={`thumbnail-double ${isTransformed ? 'transform' : ''}`} onClick={handleCardClick}>
        <img className="thumbnail-img front" src={front.image_uris.normal} alt={front.name} />
        <img className="thumbnail-img back" src={back.image_uris.normal} alt={back.name} />
      </div>
      <button className="transform-btn" onClick={handleTransform}>
        <TurnOverIcon />
      </button>
    </div>
    );
  }

  /** Rendering for single-faced cards */
  return (
    <div className="thumbnail-wrapper">
      <img
        className="thumbnail-img"
        src={image_uris?.normal}
        alt={name}
        onClick={handleCardClick}
      />
    </div>
  );
}