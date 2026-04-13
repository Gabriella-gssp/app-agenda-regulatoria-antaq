import Papa from "papaparse";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJGZy4W3fZU9D-y16B1ePH5IN8pd6K_YslVXfzAOLEYUISthDa-FuWcl-ZpVIISuQTwLuqPzqB-iqR/pub?gid=1496108364&single=true&output=csv";

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeRow(row) {
  return {
    item: normalizeText(row["Item"]),
    eixo: normalizeText(row["Eixo"]),
    tema: normalizeText(row["Tema"]),
    macroetapa: normalizeText(row["Etapa do Processo Regulatório"]),
    descricao: normalizeText(row["Descrição"]),
    airDispensa: normalizeText(row["AIR/Dispensa"]),
    agendaAnterior: normalizeText(row["Relacionamento com Agenda Anterior"]),
    processoSei: normalizeText(row["Processo SEI"]),
    areaTecnica: normalizeText(row["Área Técnica Responsável pelo Processo"]),
    statusAudiencia: normalizeText(row["Status da Audiência"]),
    relatoria: normalizeText(row["Relatoria do Processo"])
  };
}

export async function loadAgenda() {
  const cached = localStorage.getItem("agenda-cache");

  try {
    const res = await fetch(CSV_URL);
    const csvText = await res.text();

    const parsed = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true
    });

    const rows = parsed.data || [];

    if (rows.length < 3) {
      throw new Error("CSV com estrutura insuficiente.");
    }

    // A linha 0 é agrupadora; a linha 1 contém os cabeçalhos reais
    const headers = rows[1];
    const dataRows = rows.slice(2);

    const jsonData = dataRows
      .map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] ?? "";
        });
        return normalizeRow(obj);
      })
      .filter((item) => item.item && item.tema);

    localStorage.setItem("agenda-cache", JSON.stringify(jsonData));
    return jsonData;
  } catch (err) {
    console.warn("Erro ao carregar CSV. Usando cache local.", err);
    return cached ? JSON.parse(cached) : [];
  }
}