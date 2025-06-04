import ColoursIcon from '../../assets/AdvancedPageAssets/ColoursIcon';
import SYMBOL_DESCRIPTIONS from '../Card/CardInfoConstants';
import '../Others/css/Symbols.css';

export default function ColourSection({ colours, colourMode, onColoursChange, onModeChange }) {
    const colourOptions = [
    { value: "W", label: "White", icon: <abbr className="symbol symbol-W" title={SYMBOL_DESCRIPTIONS['W']} /> },
    { value: "U", label: "Blue", icon: <abbr className="symbol symbol-U" title={SYMBOL_DESCRIPTIONS['U']} /> },
    { value: "B", label: "Black", icon: <abbr className="symbol symbol-B" title={SYMBOL_DESCRIPTIONS['B']} /> },
    { value: "R", label: "Red", icon: <abbr className="symbol symbol-R" title={SYMBOL_DESCRIPTIONS['R']} /> },
    { value: "G", label: "Green", icon: <abbr className="symbol symbol-G" title={SYMBOL_DESCRIPTIONS['G']}/> },
    { value: "C", label: "Colourless", icon: <abbr className="symbol symbol-C" title={SYMBOL_DESCRIPTIONS['C']} /> }
  ];

  /**  Toggles selection of colours */
  function handleColourChange(value) {
    const updated = colours.includes(value)
      ? colours.filter((c) => c !== value)
      : [...colours, value];
    onColoursChange(updated);
  }

  /** Renders a section to select multiple colours and a dropdown to select the colour matching mode */
  return (
    <div className="form-row">
      <label className="advanced-label">
        <ColoursIcon />
        Colours
      </label>
      <div>
        <fieldset className="checkbox-group">
          {colourOptions.map(({ value, label, icon }) => (
            <label key={value} className="checkbox-label">
              <input
                type="checkbox"
                value={value}
                checked={colours.includes(value)}
                onChange={() => handleColourChange(value)}
                className="advanced-checkbox"
              />
              {icon}
              {label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <select
            value={colourMode}
            onChange={(e) => onModeChange(e.target.value)}
            className="advanced-select colours-select"
          >
            <option value="=">Exactly these colours</option>
            <option value=">=">Including these colours</option>
            <option value="<=">At most these colours</option>
          </select>
        </fieldset>
      </div>
    </div>
  );
}