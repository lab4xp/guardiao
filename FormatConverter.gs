// Conversão entre formatos de documento

/**
 * Converte documento para PDF
 * @param {string} fileId - ID do arquivo original
 * @return {string} ID do PDF gerado
 */
function converterParaPdf(fileId) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Converte para PDF usando API do Drive
  const pdfBlob = file.getAs('application/pdf');
  // Cria novo arquivo PDF
  const pdfFile = DriveApp.createFile(pdfBlob);
  pdfFile.setName(file.getName() + '.pdf');
  return pdfFile.getId();
}

/**
 * Converte planilha para CSV
 * @param {string} spreadsheetId - ID da planilha
 * @param {string} sheetName - Nome da aba
 * @return {Blob} Arquivo CSV
 */
function converterParaCsv(spreadsheetId, sheetName) {
  // Obtém planilha
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName(sheetName);
  // Converte para CSV
  const dados = sheet.getDataRange().getValues();
  const csv = dados.map(row => row.join(',')).join('\n');
  return Utilities.newBlob(csv, 'text/csv', sheetName + '.csv');
}
