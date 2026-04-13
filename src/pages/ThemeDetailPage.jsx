import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { cleanThemeName } from "../utils/formatters";

export default function ThemeDetailPage({ data }) {
  const navigate = useNavigate();
  const { axisName, itemCode } = useParams();

  const axis = decodeURIComponent(axisName);
  const code = decodeURIComponent(itemCode);

  const item = data.find((entry) => entry.eixo === axis && entry.item === code);

  if (!item) {
    return (
      <div className="page">
        <button className="back-button" onClick={() => navigate(-1)}>← Voltar</button>
        <p>Tema não encontrado.</p>
      </div>
    );
  }

  const fields = [
    ["Processo SEI", item.processoSei],
    ["Relatoria", item.relatoria],
    ["Área técnica", item.areaTecnica],
    ["Status da audiência", item.statusAudiencia],
    ["AIR / Dispensa", item.airDispensa],
    ["Agenda anterior", item.agendaAnterior],
    ["Descrição", item.descricao]
  ].filter(([, value]) => value);

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="detail-card">
        <div className="detail-card__code">{item.item}</div>
        <h2 className="detail-card__title">{cleanThemeName(item.tema)}</h2>
        <StatusBadge status={item.macroetapa} />

        <div className="detail-fields">
          {fields.map(([label, value]) => (
            <div key={label} className="detail-field">
              <div className="detail-field__label">{label}</div>
              <div className="detail-field__value">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}