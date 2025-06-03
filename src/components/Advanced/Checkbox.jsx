import './css/Checkbox.css';

export default function CheckboxGroup({ options, selected, onChange, labelPrefix = "" }) {
  const handleChange = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="checkbox-group">
      {options.map(({ value, label, icon }) => (
        <label key={value} className="checkbox-label">
          <input
            type="checkbox"
            value={value}
            checked={selected.includes(value)}
            onChange={() => handleChange(value)}
            className="advanced-checkbox"
          />
          {icon}
          {labelPrefix}{label}
        </label>
      ))}
    </div>
  );
}