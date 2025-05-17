import './css/CardRules.css'
import '../Others/css/Symbols.css';
import SYMBOL_DESCRIPTIONS from './CardInfoConstants';'./CardInfoConstants.js'
export default function CardImg({data}) {
  const mid = Math.ceil(data.length / 2);
  const leftList = data.slice(0, mid);
  const rightList = data.slice(mid);

  /**  Finds and replaces text that should be replaced with symbols e.g. {G} {1} */
  function renderSymbols(text) {
    const parts = [];
    let lastIndex = 0;
  
    const symbolPattern = /\{(.*?)\}/g;
  
    let match;
    while ((match = symbolPattern.exec(text)) !== null) {
      // Add any text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
  
      const fullMatch = match[0];
      const symbol = match[1].replace(/\//g, ''); // Remove slashes for class naming
  
      parts.push(
        <abbr
          key={parts.length}
          className={`symbol symbol-${symbol}`}
          title={SYMBOL_DESCRIPTIONS[symbol]}
        />
      );

      lastIndex = match.index + fullMatch.length;
    }
  
    // Add any remaining text after the last match
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
  
    return parts;
  }

  return (
    <div className="rulings-background">
      <section className="rules-container">
        <h2>Notes and Rules Information:</h2>
        <div className="rulings">
          <ul className="left-list">
            {leftList.map((ruling, index) => (
              <li key={index}>
                {renderSymbols(ruling.comment)}
                <i>({ruling.published_at})</i>
              </li>
            ))}
          </ul>
          <ul className="right-list">
            {rightList.map((ruling, index) => (
              <li key={index}>
                {renderSymbols(ruling.comment)}
              <i>({ruling.published_at})</i>
            </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};