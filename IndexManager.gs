// Gerenciamento de índices para busca rápida

/**
 * Cria índice para busca rápida
 * @param {string} sheetName - Nome da planilha
 * @param {number} coluna - Coluna a indexar
 */
function criarIndice(sheetName, coluna) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Obtém valores da coluna
  const dados = sheet.getRange(2, coluna, sheet.getLastRow() - 1, 1).getValues();
  // Cria mapa de índice
  const indice = {};
  dados.forEach((row, index) => {
    indice[row[0]] = index + 2; // +2 porque começa na linha 2
  });
  // Armazena índice no cache
  armazenarNoCache('INDICE_' + sheetName + '_' + coluna, JSON.stringify(indice), 3600);
}

/**
 * Busca usando índice
 * @param {string} sheetName - Nome da planilha
 * @param {number} coluna - Coluna indexada
 * @param {string} valor - Valor a buscar
 * @return {number} Linha encontrada ou -1
 */
function buscarComIndice(sheetName, coluna, valor) {
  // Recupera índice do cache
  const indiceStr = obterDoCache('INDICE_' + sheetName + '_' + coluna);
  if (!indiceStr) return -1;
  const indice = JSON.parse(indiceStr);
  return indice[valor] || -1;
}
