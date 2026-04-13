import fs from "node:fs";
import Papa from "papaparse";

const inputPath = "./src/data/agenda.csv";
const outputPath = "./src/data/agenda.json";

function normalizeRow(row) {
  const get = (key) => String(row[key] ?? "").trim();

  return {
    item: get("Item"),
    eixo: get("Eixo") || "Temas Gerais",
    tema: get("Tema"),
    macroetapa: get("Etapa do Processo Regulatório"),
    descricao: get("Descrição"),
    airDispensa: get("AIR/Dispensa"),
    agendaAnterior: get("Relacionamento com Agenda Anterior"),
    processoSei: get("Processo SEI"),
    areaTecnica: get("Área Técnica Responsável pelo Processo"),
    statusAudiencia: get("Status da Audiência"),
    relatoria: get("Relatoria do Processo")
  };
}

const csvText = fs.readFileSync(inputPath, "utf8");

const parsed = Papa.parse(csvText, {
  header: false,
  skipEmptyLines: true,
  delimiter: ";"
});

const rows = parsed.data;

// primeira linha é agrupamento visual, segunda linha é cabeçalho real
const headers = rows[1];
const dataRows = rows.slice(2);

const normalized = dataRows
  .map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] ?? "";
    });
    return normalizeRow(obj);
  })
  .filter((row) => row.item && row.tema);

fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), "utf8");

console.log(`Arquivo gerado em ${outputPath} com ${normalized.length} registros.`);