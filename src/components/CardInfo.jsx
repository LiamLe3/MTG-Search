import React from 'react';
import '../css/CardInfo.css';
export default function CardInfo({data}) {

  function getLegality() {
    if(data.legalities.commander === 'banned'){
      return 'BANNED';
    } else if(data.game_changer) {
      return 'LEGAL/GC';
    }
    return 'LEGAL';
  }
  
  function replaceSymbols(text) {
    const regex = /\{(.*?)\}/g;
    const result = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
  
      const symbol = match[1];
      result.push(
        <abbr
          key={result.length}
          className={`symbol symbol-${symbol}`}
          title={symbol}
        />
      );
  
      lastIndex = regex.lastIndex;
    }
  
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
  
    return result;
  }
  
  function renderText(oracleText) {
    const lines = oracleText.split('\n').map((line, index) => (
      <p key={index} className="card-text">{replaceSymbols(line)}</p>
    ));

    return lines;
  }
  
  return (
    <section className="card-info">
      <p className="info-block">{data.name} {replaceSymbols(data.mana_cost)}</p>
      <p className="info-block">{data.type_line}</p>
      <div className="info-block">
        {renderText(data.oracle_text)}
        <p className="card-flavour">{data.flavor_text}</p>
      </div>
      <p className="info-block">{data.artist}</p>
      <p className="info-block">{getLegality()} Commander</p>
    </section>
  );
};