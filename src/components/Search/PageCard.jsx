import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/PageCard.css"
import TurnOverIcon from '../../assets/TurnOverIcon';
export default function PageCard({data}) {
  const [isTransformed, setIsTransformed] = useState(false);
  
  const isDoubleFaced = ['transform', 'modal_dfc', 'double_faced_token', 'reversible_card', 'art_series'].includes(data.layout);

  /** Shows the back face of the card */
  function handleTransform() {
    setIsTransformed(!isTransformed);
  }

  if (isDoubleFaced && data.card_faces) {
    const [front, back] = data.card_faces;

    return (
    <div className="gallery-wrapper">
      <Link to={`/card/${data.set}/${data.collector_number}`}>
        <div className={`gallery ${isTransformed ? 'transform' : ''}`}>
          <img className="gallery-img front" src={front.image_uris.normal} alt={front.name} />
          <img className="gallery-img back" src={back.image_uris.normal} alt={back.name} />
        </div>
      </Link>
      <button className="gallery-btn" onClick={handleTransform}>
        <TurnOverIcon />
      </button>
    </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      <Link to={`/card/${data.set}/${data.collector_number}`} state={{cardData: data}}>
        <img
          className="gallery-img"
          src={data.image_uris?.normal}
          alt={data.name}
        />
      </Link>
    </div>
  );
}