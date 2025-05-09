import React from 'react';
import '../css/CardInfo.css';
export default function CardInfo({data}) {

  function getLegality() {
    if(data.legalities.commander === 'banned'){
      return 'BANNED';
    } else if(data.legalities.commander === 'not_legal'){
      return 'NOT LEGAL'
    } else if(data.game_changer) {
      return 'GAME CHANGER';
    }
    return 'LEGAL';
  }

  function processCardText(text) {
    const parts = [];
    let lastIndex = 0;
  
    const symbolPattern = /\{(.*?)\}/g;
    const parenPattern = /\(([^)]+)\)/;
    const masterPattern = new RegExp(
      `${symbolPattern.source}|${parenPattern.source}`, "gi"
    );
  
    let match;
    while ((match = masterPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
  
      const [fullMatch] = match;
  
      if (match[1]) {
        const symbol = match[1];
        parts.push(
          <abbr
            key={parts.length}
            className={`symbol symbol-${symbol}`}
            title={symbol}
          />
        );
      } else if (match[2]) {
        parts.push(<i key={parts.length}>({match[2]})</i>);
      }
  
      lastIndex = match.index + fullMatch.length;
    }
  
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
  
    return parts;
  }
  
  function renderText(oracleText) {
    const lines = oracleText.split('\n').map((line, index) => (
      <p key={index} className="oracle-text">{processCardText(line)}</p>
    ));

    return lines;
  }

  function babagee(data) {
    return (
      <>
        <p className="info-block">{data.name} {processCardText(data.mana_cost)}</p>
        <p className="info-block">{data.type_line}</p>
        <div className="info-block">
          {renderText(data.oracle_text)}
          {data.flavor_text && 
            <i className={`flavour-text ${!data.oracle_text ? 'no-oracle' : ''}`}>
              {data.flavor_text}
            </i>
          }
        </div>
        {data.power && data.toughness && <p className="info-block">{data.power}/{data.toughness}</p>}
        {data.loyalty && <p className="info-block">Loyalty: {data.loyalty}</p>}
      </>
    );
  }

  function displayInfo() {
    if(data.card_faces){
      return (
        <section className="info-container">
          {data.card_faces.map((face, index) => (
            <React.Fragment key={index}>
              {babagee(face)}
            </React.Fragment>
          ))}
          <p className="info-block">Commander {getLegality()}</p>
        </section>
      );
    }

    return (
      <section className="info-container">
        {babagee(data)}
        <p className="info-block">Commander {getLegality()}</p>
      </section>
    );
  }

  return (
    <>
      {displayInfo()}
    </>
  );
};