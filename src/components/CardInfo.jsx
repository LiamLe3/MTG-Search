import React from 'react';
import '../css/CardInfo.css';
export default function CardInfo({data}) {
  console.log('—'.charCodeAt(0))
  function getLegality() {
    if(data.legalities.commander === 'banned'){
      return 'BANNED';
    } else if(data.game_changer) {
      return 'LEGAL/GC';
    }
    return 'LEGAL';
  }

  function processCardText(text) {
    const parts = [];
    let lastIndex = 0;
  
    const symbolPattern = /\{(.*?)\}/g;
    const parenPattern = /\(([^)]+)\)/;
    const masterPattern = new RegExp(
      `${symbolPattern.source}|${parenPattern.source}`,
      "gi"
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
      <p key={index} className="card-text">{processCardText(line)}</p>
    ));

    return lines;
  }
  return (
    <section className="card-info">
      <p className="info-block">{data.name} {processCardText(data.mana_cost)}</p>
      <p className="info-block">{data.type_line}</p>
      <div className="info-block">
        {renderText(data.oracle_text)}
        <i className="card-flavour">{data.flavor_text}</i>
      </div>
      <p className="info-block">{data.artist}</p>
      <p className="info-block">{getLegality()} Commander</p>
    </section>
  );
};