import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = {
  notStarted: "#ffe2db",
  inProgress: "#bff29e",
  done: "#006400"
};

export default function AgendaStatusChart({ data }) {
  const activeItems = data.filter(
    (item) => !item.macroetapa?.toLowerCase().includes("excluído")
  );

  const notStarted = activeItems.filter((item) =>
    item.macroetapa?.startsWith("1.")
  ).length;

  const done = activeItems.filter((item) =>
    item.macroetapa?.startsWith("11.")
  ).length;

  const inProgress = activeItems.length - notStarted - done;

  const total = activeItems.length || 1;

  const chartData = [
    {
      name: "Não iniciados",
      value: notStarted,
      color: COLORS.notStarted,
      percentage: Math.round((notStarted / total) * 100)
    },
    {
      name: "Em andamento",
      value: inProgress,
      color: COLORS.inProgress,
      percentage: Math.round((inProgress / total) * 100)
    },
    {
      name: "Concluídos",
      value: done,
      color: COLORS.done,
      percentage: Math.round((done / total) * 100)
    }
  ];

  return (
    <section className="status-chart-card">
      <div className="status-chart-card__header">
        <h3>Situação dos temas</h3>
        <p>Distribuição entre não iniciados, em andamento e concluídos.</p>
      </div>

      <div className="status-chart-card__content">
        <div className="status-chart-card__inner">
          <div className="status-chart-card__chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} tema(s) • ${props.payload.percentage}%`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="status-chart-card__legend">
            {chartData.map((item) => (
              <div key={item.name} className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: item.color }}
                />
                <span>
                  {item.name} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}