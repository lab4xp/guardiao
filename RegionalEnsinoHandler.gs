// Tratamento de dados de regionais de ensino

/**
 * Busca regional de ensino por código
 * @param {string} codigo - Código da regional
 * @return {Object} Dados da regional
 */
function buscarRegionalPorCodigo(codigo) {
  // Acessa planilha de regionais
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RegionaisEnsino');
  // Busca regional pelo código
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === codigo);
}

/**
 * Lista todas as regionais de ensino
 * @return {Array} Lista de regionais
 */
function listarRegionaisEnsino() {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RegionaisEnsino');
  // Retorna todos os dados
  return sheet.getDataRange().getValues();
}
