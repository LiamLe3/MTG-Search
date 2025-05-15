import { useState } from 'react';
import TurnOverIcon from '../assets/TurnOverIcon';
export default function PageCard({data}) {
  const [isTransformed, setIsTransformed] = useState(false);
  
  const [front, back] = data.card_faces;

  /** Shows the back face of the card */
  function handleTransform() {
    setIsTransformed(!isTransformed);
  }

  return (
    <>
      <div className={`blah ${isTransformed ? 'transform' : ''}`}>
        <img className="blah-img front" src={front.image_uris.png} alt={front.name} />
        <img className="blah-img back" src={back.image_uris.png} alt={back.name} />
      </div>
      <button onClick={handleTransform}>
        <TurnOverIcon />
      </button>
    </>
  );
}