import { useState } from 'react';
import './css/CardImg.css'

import RightRotateIcon from '../../assets/RightRotateIcon';
import LeftRotateIcon from '../../assets/LeftRotateIcon';
import TurnOverIcon from '../../assets/TurnOverIcon';

export default function CardImg({data}) {
  const [isRotated, setIsRotated] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);

  /** Displays a standard card layout */
  function normalCard() {
    return (
      <img className="card-img normal" src={data.image_uris.png} alt={data.name} />
    );
  }

  /** Rotate card by 90 degrees */
  function handleRotate() {
    setIsRotated(!isRotated);
  }

  /** Displays a split card layout */
  function splitCard() {
    // Checks if the card layout is that of an Aftermath card
    const hasAftermath = data.keywords.some(ability => ability === "Aftermath");

    return (
      <>
        <div className={`card ${isRotated ? 'rotate' : ''} ${hasAftermath ? 'left' : 'right'}`}>
          <img className="card-img split" src={data.image_uris.png} alt={data.name} />
        </div>
        <button onClick={handleRotate}>
          {hasAftermath ? <LeftRotateIcon /> : <RightRotateIcon />}
          <b>Rotate</b>
        </button>
      </>
    );
  }

  /** Rotate card by 180 degrees */
  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  /** Displays a flip card layout */
  function flipCard() {
    return (
      <>
        <div className={`card ${isFlipped ? 'flip' : ''}`}>
          <img className="card-img" src={data.image_uris.png} alt={data.name} />
        </div>
        <button onClick={handleFlip}>
          <RightRotateIcon />
          <b>Flip</b>
        </button>
      </>
    );
  }

  /** Shows the back face of the card */
  function handleTransform() {
    setIsTransformed(!isTransformed);
  }

  /** Displays a card layout with a back face*/
  function transformCard() {
    const [front, back] = data.card_faces;
    return (
      <>
        <div className={`card ${isTransformed ? 'transform' : ''}`}>
          <img className="card-img front" src={front.image_uris.png} alt={front.name} />
          <img className="card-img back" src={back.image_uris.png} alt={back.name} />
        </div>
        <button onClick={handleTransform}>
          <TurnOverIcon />
          <b>Turn Over</b>
        </button>
      </>
    );
  }

  /** Same as transformCard, but this specifically accounts for meld cards which may or may not require a back face to be shown */
  function meldCard() {
    // This finds the image of the back face
    const backId = data.card_back_id;
    const backImg = `https://backs.scryfall.io/png/${backId[0]}/${backId[1]}/${backId}.png`;

    // Determines whether the card displayed is a meld part or meld result
    const isMeldResult = data.all_parts.some((part) => {
      return part.component === 'meld_result' && part.name === data.name
    });
    
    // If the card is a meld result, don't display the back face or button to view the back.
    // Otherwise the card is a meld part, thus display both.
    return (
      <>
        <div className={`card ${isTransformed ? 'transform' : ''}`}>
          <img className={`card-img front ${isMeldResult ? 'meld-result' : ''}`} src={data.image_uris.png} alt={data.name} />
          {!isMeldResult && <img className="card-img back" src={backImg} alt={`Card back of ${data.name}`} />}
        </div>
        {!isMeldResult &&
          <button onClick={handleTransform}>
            <TurnOverIcon />
            <b>Turn Over</b>
          </button>
        }
      </>
    );
  }

  // Determines and displays the correct layout of the card
  function displayLayout() {
    if(['split', 'planar'].includes(data.layout)) return splitCard();
    else if(data.layout === 'flip') return flipCard();
    else if(['transform', 'modal_dfc', 'double_faced_token', 'reversible_card'].includes(data.layout)) {
      return transformCard();
    }
    else if(data.layout === 'meld') return meldCard();
    else return normalCard();
  }
  
  return (
    <div className="img-container">
        {displayLayout()}
    </div>
  );
};