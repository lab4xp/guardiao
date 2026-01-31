// Gerenciamento de tooltips informativos

/**
 * Adiciona tooltip a uma célula
 * @param {string} sheetName - Nome da planilha
 * @param {number} linha - Linha da célula
 * @param {number} coluna - Coluna da célula
 * @param {string} texto - Texto do tooltip
 */
function adicionarTooltip(sheetName, linha, coluna, texto) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Adiciona nota (tooltip) à célula
  sheet.getRange(linha, coluna).setNote(texto);
}

/**
 * Remove tooltip de uma célula
 * @param {string} sheetName - Nome da planilha
 * @param {number} linha - Linha da célula
 * @param {number} coluna - Coluna da célula
 */
function removerTooltip(sheetName, linha, coluna) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Remove nota
  sheet.getRange(linha, coluna).clearNote();
}
