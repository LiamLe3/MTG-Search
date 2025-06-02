import './css/Checkbox.css';

export default function CheckboxGroup({ options, selected, onChange, labelPrefix = "" }) {
  const handleChange = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <>
      {options.map(({ value, label, icon }) => (
        <label key={value}>
          <input
            type="checkbox"
            value={value}
            checked={selected.includes(value)}
            onChange={() => handleChange(value)}
          />
          {icon}
          {labelPrefix}{label}
        </label>
      ))}
    </>
  );
}