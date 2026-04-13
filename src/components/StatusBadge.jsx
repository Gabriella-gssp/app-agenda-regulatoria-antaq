import { getStatusClass } from "../utils/formatters";

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status || "Sem macroetapa"}
    </span>
  );
}