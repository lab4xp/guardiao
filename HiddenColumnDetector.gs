// Detecção de colunas ocultas em planilhas

/**
 * Detecta colunas ocultas em uma planilha
 * @param {string} sheetName - Nome da planilha
 * @return {Array} Índices das colunas ocultas
 */
function detectarColunasOcultas(sheetName) {
  // Acessa planilha especificada
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Verifica cada coluna
  const colunasOcultas = [];
  for (let i = 1; i <= sheet.getMaxColumns(); i++) {
    // Verifica se coluna está oculta
    if (sheet.isColumnHiddenByUser(i)) {
      colunasOcultas.push(i);
    }
  }
  return colunasOcultas;
}

/**
 * Exibe todas as colunas ocultas
 * @param {string} sheetName - Nome da planilha
 */
function exibirTodasColunas(sheetName) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Exibe todas as colunas
  sheet.showColumns(1, sheet.getMaxColumns());
}
