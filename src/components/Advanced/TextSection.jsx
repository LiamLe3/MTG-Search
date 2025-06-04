export default function TextSection({ icon, label, value, onChange, placeholder }) {

  /** Renders a reusable input section that changes the working query when any text is inputted.
   * Used for fields like name, text, type, set code, or artist
   */
  return (
    <div className="form-row">
      <label className="advanced-label">
        {icon}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
}