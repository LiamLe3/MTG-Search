import RarityIcon from '../../assets/AdvancedPageAssets/RarityIcon';

export default function RaritySection({ rarity, onChange }) {
  const rarityOptions = [
    { value: "common", label: "Common" },
    { value: "uncommon", label: "Uncommon" },
    { value: "rare", label: "Rare" },
    { value: "mythic", label: "Mythic" }
  ];

  /** Toggles selection of rarities */
  function handleRarityChange(value) {
    const updated = rarity.includes(value)
      ? rarity.filter((r) => r !== value)
      : [...rarity, value];
    onChange(updated);
  }

  /** Renders a section to select multiple card rarities */
  return (
    <div className="form-row">
      <label className="advanced-label">
        <RarityIcon />
        Rarity
      </label>
      <fieldset className="checkbox-group">
        {rarityOptions.map(({ value, label }) => (
          <label key={value} className="checkbox-label">
            <input
              type="checkbox"
              value={value}
              checked={rarity.includes(value)}
              onChange={() => handleRarityChange(value)}
              className="advanced-checkbox"
            />
            {label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}