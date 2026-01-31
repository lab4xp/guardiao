// Tratamento de dados de RH

/**
 * Busca dados de servidor por matrícula
 * @param {string} matricula - Matrícula do servidor
 * @return {Object} Dados do servidor
 */
function buscarServidorPorMatricula(matricula) {
  // Acessa planilha de servidores
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Servidores');
  // Busca servidor pela matrícula
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === matricula);
}

/**
 * Atualiza dados de RH de um servidor
 * @param {string} matricula - Matrícula do servidor
 * @param {Object} novosDados - Novos dados
 */
function atualizarDadosRh(matricula, novosDados) {
  // Localiza servidor na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Servidores');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === matricula) + 1;
  // Atualiza dados
  sheet.getRange(linha, 1, 1, Object.keys(novosDados).length).setValues([Object.values(novosDados)]);
}
