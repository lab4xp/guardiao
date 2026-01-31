// Tratamento de dados de escolas

/**
 * Busca dados de escola por código INEP
 * @param {string} codigoInep - Código INEP da escola
 * @return {Object} Dados da escola
 */
function buscarEscolaPorInep(codigoInep) {
  // Acessa planilha de escolas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Escolas');
  // Busca escola pelo código INEP
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === codigoInep);
}

/**
 * Atualiza dados de uma escola
 * @param {string} codigoInep - Código INEP
 * @param {Object} novosDados - Novos dados da escola
 */
function atualizarDadosEscola(codigoInep, novosDados) {
  // Localiza escola na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Escolas');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === codigoInep) + 1;
  // Atualiza dados
  sheet.getRange(linha, 1, 1, Object.keys(novosDados).length).setValues([Object.values(novosDados)]);
}
