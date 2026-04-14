import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
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

  const chartData = [
    { name: "Não iniciados", value: notStarted, color: COLORS.notStarted },
    { name: "Em andamento", value: inProgress, color: COLORS.inProgress },
    { name: "Concluídos", value: done, color: COLORS.done }
  ];

  return (
    <section className="status-chart-card">
      <div className="status-chart-card__header">
        <h3>Situação dos temas</h3>
        <p>Distribuição entre não iniciados, em andamento e concluídos.</p>
      </div>

      <div className="status-chart-card__content">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}