import { useEffect, useState } from 'react';
import '../css/CardImg.css'
export default function CardImg({data}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [rotation, setRotation] = useState(0);

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function meldCard() {
    
  }

  function splitCard() {
    return (
      <img className="card-img split" src={data.image_uris.png} alt={data.name} />
    );
  }

  function normalCard() {
    return (
      <img className="card-img normal" src={`https://cards.scryfall.io/card_back/130c9fd0-22e2-434a-afc9-0890ce7b368c.jpg`} alt={data.name} />
    );
  }

  function flipCard() {
    return (
      <img className="card-img flip" src={data.image_uris.png} alt={data.name} />
    );
  }
  function transformCard() {
    return (
      <>

        <button>Transform</button>
      </>
    );
  }
  return (
    <div className="img-container">
      {splitCard()}
    </div>
  );
};