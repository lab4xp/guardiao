// Motor de busca em documentos processados

/**
 * Busca documentos por termo
 * @param {string} termo - Termo de busca
 * @return {Array} Documentos encontrados
 */
function buscarDocumentos(termo) {
  // Acessa planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  // Filtra documentos que contêm o termo
  return dados.filter(row => {
    const titulo = row[1].toString().toLowerCase();
    return titulo.includes(termo.toLowerCase());
  });
}

/**
 * Busca avançada com múltiplos filtros
 * @param {Object} filtros - Filtros de busca
 * @return {Array} Documentos encontrados
 */
function buscaAvancada(filtros) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  let dados = sheet.getDataRange().getValues();
  // Aplica cada filtro
  if (filtros.status) {
    dados = dados.filter(row => row[4] === filtros.status);
  }
  if (filtros.dataInicio) {
    dados = dados.filter(row => new Date(row[2]) >= filtros.dataInicio);
  }
  return dados;
}
