import { useEffect, useState } from 'react';
import '../css/CardImg.css'
export default function CardImg({data}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [rotation, setRotation] = useState(0);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function handleTransform() {
    setIsTransformed(!isTransformed);
  }

  function meldCard() {
    const backId = data.card_back_id;
    const backString = `https://backs.scryfall.io/png/${backId[0]}/${backId[1]}/${backId}.png`;

    const meldResult = data.all_parts.some((part) => {
      return part.component === 'meld_result' && part.name === data.name
    });

    return (
      <>
        <div className={`card ${isTransformed ? 'transform' : ''}`}>
          <img className="front" src={data.image_uris.png} alt={data.name} />
          {!meldResult && <img className="back" src={backString} alt={`Card back of ${data.name}`} />}
        </div>
        {!meldResult && <button onClick={handleTransform}>View Back</button>}
      </>
    );
  }

  function splitCard() {
    return (
      <>
        <img className="card-img split" src={data.image_uris.png} alt={data.name} />
        <button>Rotate Left</button>
        <button>Rotate Right</button>
      </>
      
    );
  }

  function normalCard() {
    return (
      <img className="card-img normal" src={data.image_uris.png} alt={data.name} />
    );
  }

  function flipCard() {
    return (
      <>
        <div className={`card ${isFlipped ? 'flip' : ''}`}>
          <img className="card-img" src={data.image_uris.png} alt={data.name} />
        </div>
        <button onClick={handleFlip}>Flip</button>
      </>
    );
  }

  function transformCard() {
    return (
      <>
        <div className={`card ${isTransformed ? 'transform' : ''}`}>
          <img className="front" src={data.card_faces[0].image_uris.png} alt={data.card_faces[0].name} />
          <img className="back" src={data.card_faces[1].image_uris.png} alt={data.card_faces[1].name} />
        </div>
        <button onClick={handleTransform}>View Back</button>
      </>
    );
  }

  function blah() {
    if(data.layout === 'split') return splitCard();
    else if(data.layout === 'flip') return flipCard();
    else if(['transform', 'modal_dfc', 'double_faced_token', 'reversible_card'].includes(data.layout))
      return transformCard();
    else if(data.layout === 'meld') return meldCard();
    else return normalCard();
  }
  return (
    <div className="img-container">
      {blah()}
    </div>
  );
};