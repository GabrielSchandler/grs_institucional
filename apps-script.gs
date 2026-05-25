const DEFAULT_SHEET_NAME = "Leads";

const HEADERS = [
  "created_at",
  "nome",
  "whatsapp",
  "tipo_contrato",
  "valor_parcela",
  "parcelas_atrasadas",
  "banco",
  "mensagem",
  "origem",
  "page_url",
];

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const webhookSecret = props.getProperty("WEBHOOK_SECRET");
    const spreadsheetId = props.getProperty("SPREADSHEET_ID");
    const sheetName = props.getProperty("SHEET_NAME") || DEFAULT_SHEET_NAME;
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");

    if (!webhookSecret || payload.secret !== webhookSecret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const lead = payload.lead || {};
    const meta = payload.meta || {};
    const spreadsheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId)
      : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(spreadsheet, sheetName);

    ensureHeaders(sheet);
    sheet.appendRow([
      meta.submitted_at || new Date().toISOString(),
      lead.nome || "",
      lead.whatsapp || "",
      lead.tipo_contrato || "",
      lead.valor_parcela || "",
      lead.parcelas_atrasadas === true ? "Sim" : "Não",
      lead.banco || "",
      lead.mensagem || "",
      lead.origem || "landing_page",
      meta.page_url || "",
    ]);

    return json({ ok: true });
  } catch (error) {
    return json({
      ok: false,
      error: error && error.message ? error.message : String(error),
    });
  }
}

function getOrCreateSheet(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = range.getValues()[0];
  const hasHeaders = currentHeaders.some(function (cell) {
    return String(cell).trim() !== "";
  });

  if (!hasHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
