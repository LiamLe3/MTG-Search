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
  
  const legality = getLegality();
  
  return (
    <section className="card-info">
      <p className="info-block">{data.name} {replaceSymbols(data.mana_cost)}</p>
      <p className="info-block">{data.type_line}</p>
      <div className="info-block">
        {data.oracle_text.split('\n').map((line) => (
          <p className="card-text">{line}</p>
        ))}
        <p className="card-flavour">{data.flavor_text}</p>
      </div>
      <p className="info-block">{data.artist}</p>
      <p className="info-block">{legality} Commander</p>
      <p><abbr className="symbol symbol-T" title="weee"></abbr></p>
    </section>
  );
};