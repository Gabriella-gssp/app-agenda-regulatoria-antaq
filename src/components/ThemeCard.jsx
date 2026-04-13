import StatusBadge from "./StatusBadge";
import { cleanThemeName } from "../utils/formatters";

export default function ThemeCard({ item, onClick }) {
  return (
    <button className="theme-card" onClick={onClick}>
      <div className="theme-card__top">
        <div className="theme-card__code">{item.item}</div>
        <StatusBadge status={item.macroetapa} />
      </div>

      <div className="theme-card__title">
        {cleanThemeName(item.tema)}
      </div>

      <div className="theme-card__meta">
        {item.processoSei || "Sem processo informado"}
      </div>

      <div className="theme-card__bottom">
        <span><strong>Relatoria:</strong> {item.relatoria || "—"}</span>
        <span><strong>Área:</strong> {item.areaTecnica || "—"}</span>
      </div>
    </button>
  );
}