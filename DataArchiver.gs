// Arquivamento de dados antigos

/**
 * Arquiva documentos antigos
 * @param {number} diasRetencao - Dias de retenção
 */
function arquivarDocumentosAntigos(diasRetencao) {
  // Calcula data limite
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - diasRetencao);
  // Busca documentos antigos na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  // Move documentos antigos para planilha de arquivo
  dados.forEach((row, index) => {
    if (new Date(row[2]) < dataLimite) {
      moverParaArquivo(row, index + 1);
    }
  });
}

/**
 * Move registro para planilha de arquivo
 * @param {Array} registro - Dados do registro
 * @param {number} linha - Linha original
 */
function moverParaArquivo(registro, linha) {
  // Adiciona à planilha de arquivo
  const sheetArquivo = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Arquivo');
  sheetArquivo.appendRow(registro);
  // Remove da planilha original
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  sheet.deleteRow(linha);
}
