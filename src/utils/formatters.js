export function cleanThemeName(text) {
  return String(text || "")
    .replace(/^\d+(\.\d+)?\s*/, "")
    .replace(/\*+$/, "")
    .trim();
}

export function getStatusClass(status) {
  const text = String(status || "").trim();

  if (text.toLowerCase().includes("excluído")) {
    return "status--excluded";
  }

  const match = text.match(/^(\d+)\./);
  const step = match ? Number(match[1]) : null;

  switch (step) {
    case 1:
      return "status--not-started";
    case 2:
      return "status--analysis";
    case 4:
      return "status--draft";
    case 5:
      return "status--pre-social";
    case 6:
      return "status--social";
    case 7:
      return "status--contributions";
    case 10:
      return "status--final";
    case 11:
      return "status--done";
    default:
      return "status--default";
  }
}

export function getAxisLabel(axis) {
  const map = {
    "Navegação Interior": "Nav. Interior",
    "Navegação Marítima": "Nav. Marítima",
    "Instalações Portuárias": "Inst. Portuária",
    "Transversal": "Transversal"
  };

  return map[axis] || axis;
}