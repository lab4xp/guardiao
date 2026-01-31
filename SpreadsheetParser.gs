// Parser de planilhas Excel/Sheets

/**
 * Extrai dados de planilha
 * @param {string} fileId - ID do arquivo
 * @param {string} sheetName - Nome da aba
 * @return {Array} Dados extraídos
 */
function extrairDadosPlanilha(fileId, sheetName) {
  // Abre planilha
  const ss = SpreadsheetApp.openById(fileId);
  const sheet = ss.getSheetByName(sheetName);
  // Retorna todos os dados
  return sheet.getDataRange().getValues();
}

/**
 * Converte planilha para JSON
 * @param {Array} dados - Dados da planilha
 * @return {Array} Array de objetos JSON
 */
function converterPlanilhaParaJson(dados) {
  // Primeira linha é cabeçalho
  const cabecalho = dados[0];
  // Converte linhas restantes em objetos
  return dados.slice(1).map(row => {
    const obj = {};
    cabecalho.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
}
