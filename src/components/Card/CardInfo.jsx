import React from 'react';
import SYMBOL_DESCRIPTIONS from './CardInfoConstants.js';
import './css/CardInfo.css';
import '../Others/css/Symbols.css';
export default function CardInfo({data}) {

  /** Finds and replaces symbols and italicises text in parenthesis */
  function renderCardText(text) {
    const parts = [];
    let lastIndex = 0;
  
    const symbolPattern = /\{(.*?)\}/g;
    const parenPattern = /\(([^)]+)\)/;
    const masterPattern = new RegExp(
      `${symbolPattern.source}|${parenPattern.source}`, "gi"
    );
  
    let match;
    while ((match = masterPattern.exec(text)) !== null) {

      // Adds any text before each match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
  
      const [fullMatch] = match;
  
      if (match[1]) { // Replace text with symbols e.g. {G} {1}
        const symbol = match[1].replace(/\//g, ''); // 'replaces '/' in symbol e.g. {G/W}
        parts.push(
          <abbr
            key={parts.length}
            className={`symbol symbol-${symbol}`}
            title={SYMBOL_DESCRIPTIONS[symbol]}
          />
        );

      } else if (match[2]) { // Italicise parenthesis
        //Recursively call renderCardText to handle nested symbols inside parenthesis
        parts.push(<i key={parts.length}>({renderCardText(match[2])})</i>);
      }
  
      lastIndex = match.index + fullMatch.length;
    }
    
    // Add any text remaining after last match
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
  
    return parts;
  }
  
  /** Renders oracle text, splits them by \n into <p> */
  function renderOracleText(oracleText) {
    const lines = oracleText.split('\n').map((line, index) => (
      <p key={index} className="oracle-text">{renderCardText(line)}</p>
    ));

    return lines;
  }

  /** Renders the flavour text, adds breaks to replace \n */
  function renderFlavourText(){
    return (
      <i className={`flavour-text ${!data.oracle_text ? 'no-oracle' : ''}`}>
        {data.flavor_text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </i>
    );
  }

  /** Displays the correct layout for multi-modal or modal cards */
  function displayInfo() {
    if(data.card_faces){
      return (
        <>
          {data.card_faces.map((face, index) => (
            <React.Fragment key={index}>
              <p className="info-block">{face.name} {renderCardText(face.mana_cost)}</p>
              <p className="info-block">{face.type_line}</p>
              <div className="info-block">
                {face.oracle_text && renderOracleText(face.oracle_text)}
                {face.flavor_text && renderFlavourText()}
              </div>
              {face.power && face.toughness && <p className="info-block">{face.power}/{face.toughness}</p>}
              {face.loyalty && <p className="info-block">Loyalty: {face.loyalty}</p>}
            </React.Fragment>
          ))}
        </>
      );
    }

    return renderInfo(data);
  }

  /** Displays the legality of the card */
  function displayLegality() {
    if(data.legalities.commander === 'banned'){
      return <p className="info-block legality">Commander <span className="banned">BANNED</span></p>;
    } else if(data.legalities.commander === 'not_legal'){
      return <p className="info-block legality">Commander <span className="not-legal">NOT LEGAL</span></p>;
    } else if(data.game_changer) {
      return <p className="info-block legality">Commander <span className="game-changer">LEGAL/GC</span></p>;
    }
    return <p className="info-block legality">Commander <span className="legal">LEGAL</span></p>;;
  }

  return (
    <>
      <section className="info-container">
        {displayInfo()}
        {displayLegality()}
      </section>
    </>
  );
};