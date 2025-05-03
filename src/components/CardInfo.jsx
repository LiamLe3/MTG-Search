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
  
  const abilityWords = new Set([
    "Adamant", "Addendum", "Alliance", "Battalion", "Bloodrush", "Celebration", "Channel", "Chroma", "Cohort",
    "Constellation", "Converge", "Corrupted", "Council's dilemma", "Coven", "Delirium", "Descend 4", "Descend 8",
    "Domain", "Eerie", "Eminence", "Enrage", "Fateful hour", "Fathomless Descent", "Ferocious", "Formidable",
    "Grandeur", "Hellbent", "Heroic", "Imprint", "Inspired", "Join forces", "Kinship", "Landfall", "Lieutenant",
    "Magecraft", "Metalcraft", "Morbid", "Pack tactics", "Parade!", "Paradox", "Parley", "Radiance", "Raid", "Rally",
    "Revolt", "Spell mastery", "Strive", "Sweep", "Tempting offer", "Threshold", "Underdog", "Undergrowth", "Valiant",
    "Will of the council", "Will of the Planeswalkers"
  ]);

  function processCardText(text) {
    const parts = [];
    let lastIndex = 0;
  
    const symbolPattern = /\{(.*?)\}/g;
    const parenPattern = /\(([^)]+)\)/;
    const hyphenPattern = /— ([^—]+?) —/g;
    const abilityPattern = new RegExp(`\\b(${[...abilityWords].join("|")})\\b`, "gi");
    const masterPattern = new RegExp(
      `${symbolPattern.source}|${parenPattern.source}|${hyphenPattern.source}|${abilityPattern.source}`,
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
      } else if (match[3]) {
        parts.push(<i key={parts.length}>- {match[3]} -</i>);
      } else if (match[4]) {
        parts.push(<i key={parts.length}>{match[4]}</i>);
      }
  
      lastIndex = match.index + fullMatch.length;
    }
  
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
  
    return parts;
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
      <p key={index} className="card-text">{processCardText("I, II — Heavenly Strike — Tap target creature an opponent controls. Put a stun counter on it. (If a permanent with a stun counter would become untapped, remove one from it instead.)")}</p>
    ));

    return lines;
  }

  return (
    <section className="card-info">
      <p className="info-block">{data.name} {replaceSymbols(data.mana_cost)}</p>
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