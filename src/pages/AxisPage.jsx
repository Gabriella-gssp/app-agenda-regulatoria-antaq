import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ThemeCard from "../components/ThemeCard";

export default function AxisPage({ data, concludedMode = false }) {
  const navigate = useNavigate();
  const { axisName } = useParams();

  const axis = decodeURIComponent(axisName || "");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");

  const activeData = useMemo(() => {
    return data.filter(
      (item) => !item.macroetapa?.toLowerCase().includes("excluído")
    );
  }, [data]);

  const baseItems = useMemo(() => {
    if (concludedMode) {
      return activeData.filter((item) =>
        item.macroetapa?.toLowerCase().includes("concluído")
      );
    }

    return activeData.filter((item) => item.eixo === axis);
  }, [activeData, axis, concludedMode]);

  const statuses = useMemo(() => {
    return ["Todos", ...new Set(baseItems.map((item) => item.macroetapa).filter(Boolean))];
  }, [baseItems]);

  const filtered = useMemo(() => {
    return baseItems.filter((item) => {
      const searchTarget = [
        item.item,
        item.tema,
        item.macroetapa,
        item.processoSei,
        item.relatoria,
        item.areaTecnica
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = searchTarget.includes(query.toLowerCase());
      const matchesStatus = status === "Todos" || item.macroetapa === status;

      return matchesQuery && matchesStatus;
    });
  }, [baseItems, query, status]);

  return (
    <div className="page">
      <div className="back-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>

      <h2>{concludedMode ? "Concluídos" : axis}</h2>
      <p className="page-subtitle">{filtered.length} resultado(s)</p>

      <SearchBar
        value={query}
        onChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        statuses={statuses}
      />

      <div className="theme-list">
        {filtered.map((item) => (
          <ThemeCard
            key={`${item.eixo}-${item.item}`}
            item={item}
            onClick={() =>
              navigate(
                `/tema/${encodeURIComponent(item.eixo)}/${encodeURIComponent(item.item)}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
}