// Construtor de queries para Sheets

/**
 * Constrói query para busca em planilha
 * @param {string} sheetName - Nome da planilha
 * @param {Object} filtros - Filtros a aplicar
 * @return {Array} Resultados da query
 */
function construirQuery(sheetName, filtros) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const dados = sheet.getDataRange().getValues();
  // Aplica filtros
  let resultados = dados;
  Object.keys(filtros).forEach(coluna => {
    const valor = filtros[coluna];
    resultados = resultados.filter(row => row[coluna] === valor);
  });
  return resultados;
}

/**
 * Busca com operador LIKE
 * @param {string} sheetName - Nome da planilha
 * @param {number} coluna - Índice da coluna
 * @param {string} padrao - Padrão a buscar
 * @return {Array} Resultados
 */
function buscarComLike(sheetName, coluna, padrao) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const dados = sheet.getDataRange().getValues();
  // Filtra por padrão
  return dados.filter(row => row[coluna].toString().includes(padrao));
}
