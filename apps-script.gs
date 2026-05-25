// ══════════════════════════════════════════════════════════
// GRS SOLUÇÕES — Google Apps Script
// Cole este código no Google Apps Script e publique como Web App
// Guia de instalação: leia o SETUP.md
// ══════════════════════════════════════════════════════════

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const sheet  = getOrCreateSheet();
    const now    = new Date();

    const row = [
      now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      data.nome       || '',
      data.sobrenome  || '',
      data.email      || '',
      data.telefone   || '',
      data.mensagem   || '',
      'Novo'
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('GRS Soluções — endpoint ativo.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Data/Hora', 'Nome', 'Sobrenome', 'E-mail', 'Telefone', 'Mensagem', 'Status'
    ]);

    // Formatar cabeçalho
    const header = sheet.getRange(1, 1, 1, 7);
    header.setBackground('#CC1530');
    header.setFontColor('#FFFFFF');
    header.setFontWeight('bold');
    sheet.setFrozenRows(1);

    // Larguras das colunas
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 140);
    sheet.setColumnWidth(3, 140);
    sheet.setColumnWidth(4, 220);
    sheet.setColumnWidth(5, 140);
    sheet.setColumnWidth(6, 350);
    sheet.setColumnWidth(7, 100);
  }

  return sheet;
}
