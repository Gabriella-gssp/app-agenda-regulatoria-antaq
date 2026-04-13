export default function AxisCard({ title, count, onClick, icon }) {
  return (
    <button className="axis-card" onClick={onClick}>
      <div className="axis-card__icon">{icon}</div>
      <div className="axis-card__title">{title}</div>
      <div className="axis-card__count">{count} tema(s)</div>
    </button>
  );
}