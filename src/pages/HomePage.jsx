import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AxisCard from "../components/AxisCard";
import AgendaStatusChart from "../components/AgendaStatusChart";

const REPORT_URL =
  "https://www.gov.br/antaq/pt-br/acesso-a-informacao/acoes-e-programas/governanca-regulatoria/agenda-regulatoria-ar/agenda-regulatoria-2025-2028";

export default function HomePage({ data }) {
  const navigate = useNavigate();

  const axes = [
    { key: "Navegação Interior", label: "Nav. Interior", icon: "⛵" },
    { key: "Navegação Marítima", label: "Nav. Marítima", icon: "🚢" },
    { key: "Instalações Portuárias", label: "Inst. Portuária", icon: "🏢" },
    { key: "Transversal", label: "Transversal", icon: "🔄" }
  ];

  const activeData = useMemo(() => {
    return data.filter(
      (item) => !item.macroetapa?.toLowerCase().includes("excluído")
    );
  }, [data]);

  const countByAxis = useMemo(() => {
    return axes.reduce((acc, axis) => {
      acc[axis.key] = activeData.filter((item) => item.eixo === axis.key).length;
      return acc;
    }, {});
  }, [activeData]);

  const concluded = useMemo(() => {
    return activeData.filter((item) =>
      item.macroetapa?.toLowerCase().includes("concluído")
    ).length;
  }, [activeData]);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__top">
          <img
            src={`${import.meta.env.BASE_URL}logo-antaq.png`}
            alt="Logo ANTAQ"
            className="hero__logo"
          />
          <h1>Agenda Regulatória</h1>
        </div>

        <p className="hero__subtitle">
          Painel rápido para acompanhar temas, macroetapas, processos SEI e
          relatorias.
        </p>
      </header>

      <section className="summary">
        <div className="summary__box">
          <span>Total de temas ativos</span>
          <strong>{activeData.length}</strong>
        </div>
        <div className="summary__box">
          <span>Concluídos</span>
          <strong>{concluded}</strong>
        </div>
      </section>

      <AgendaStatusChart data={data} />

      <section className="axis-grid">
        {axes.map((axis) => (
          <AxisCard
            key={axis.key}
            title={axis.label}
            count={countByAxis[axis.key] || 0}
            icon={axis.icon}
            onClick={() => navigate(`/eixo/${encodeURIComponent(axis.key)}`)}
          />
        ))}

        <AxisCard
          title="Concluídos"
          count={concluded}
          icon="✅"
          onClick={() => navigate("/concluidos")}
        />

        <a
          className="axis-card axis-card--link"
          href={REPORT_URL}
          target="_blank"
          rel="noreferrer"
        >
          <div className="axis-card__icon">🌐</div>
          <div className="axis-card__title">Link Relatório</div>
          <div className="axis-card__count">Abrir página da agenda</div>
        </a>
      </section>
    </div>
  );
}