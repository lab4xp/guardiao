// Gerenciamento de paleta de cores Neon

/**
 * Retorna paleta de cores Neon do sistema
 * @return {Object} Objeto com cores da paleta
 */
function obterPaletaNeon() {
  // Define paleta de cores Neon padrão
  return {
    magenta: '#FF00FF',
    ciano: '#00FFFF',
    verde: '#00FF00',
    amarelo: '#FFFF00',
    laranja: '#FF6600'
  };
}

/**
 * Aplica tema Neon na planilha
 * @param {string} sheetName - Nome da planilha
 */
function aplicarTemaNeon(sheetName) {
  // Obtém a planilha especificada
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Aplica cores Neon no cabeçalho
  const paleta = obterPaletaNeon();
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setBackground(paleta.magenta);
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontColor('#FFFFFF');
}
