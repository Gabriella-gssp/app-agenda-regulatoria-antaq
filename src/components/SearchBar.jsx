export default function SearchBar({ value, onChange, status, onStatusChange, statuses }) {
  return (
    <div className="toolbar">
      <input
        className="toolbar__search"
        placeholder="Buscar tema, processo, relatoria..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <select className="toolbar__select" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}