// Gerenciamento do tema Neon Dark Mode

/**
 * Aplica tema Neon Dark Mode na planilha
 * @param {string} sheetName - Nome da planilha
 */
function aplicarTemaNeonDark(sheetName) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Define cores do tema Neon Dark
  const cores = {
    fundo: '#1a1a2e',
    texto: '#eaeaea',
    destaque: '#ff00ff',
    secundario: '#00ffff'
  };
  // Aplica cores
  sheet.setTabColor(cores.destaque);
  sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .setBackground(cores.fundo)
    .setFontColor(cores.destaque);
}

/**
 * Remove tema Neon e volta ao padrão
 * @param {string} sheetName - Nome da planilha
 */
function removerTemaNeon(sheetName) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Restaura cores padrão
  sheet.setTabColor(null);
  sheet.getRange(1, 1, 1, sheet.getLastColumn())
    .setBackground('#ffffff')
    .setFontColor('#000000');
}
