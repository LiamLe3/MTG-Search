import StatsIcon from '../../assets/AdvancedPageAssets/StatsIcon';

export default function StatsSection({ stats, onStatChange }) {
  /**  Renders a section for adding stat-based filters (mana cost, power, toughness, and loyalty) 
   *   Up to 4 stat-based filters can be rendered
  */
  return (
    <div className="form-row">
      <label className="advanced-label">
        <StatsIcon />
        Stats
      </label>
      <div className="stats-section">
        {stats.map((statFilter, index) => (
          <div key={index} className="stats-row">
            <select
              value={statFilter.stat}
              onChange={(e) => onStatChange(index, 'stat', e.target.value)}
              className="advanced-select"
            >
              <option value="" disabled hidden></option>
              <option value="cmc">Mana Value</option>
              <option value="pow">Power</option>
              <option value="tou">Toughness</option>
              <option value="loy">Loyalty</option>
            </select>
            <select
              value={statFilter.operator}
              onChange={(e) => onStatChange(index, 'operator', e.target.value)}
              className="advanced-select"
            >
              <option value="" disabled hidden></option>
              <option value="=">equal to</option>
              <option value="<">less than</option>
              <option value=">">greater than</option>
              <option value="<=">less than or equal to</option>
              <option value=">=">greater than or equal to</option>
              <option value="!=">not equal to</option>
            </select>
            <input
              type="number"
              value={statFilter.value}
              onChange={(e) => onStatChange(index, 'value', e.target.value)}
              placeholder='Any value, e.g. "3"'
              className="stats-input"
            />
          </div>
        ))}
      </div>
    </div>
  );
}