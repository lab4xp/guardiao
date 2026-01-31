// Tratamento de dados de servidores

/**
 * Busca servidor por CPF
 * @param {string} cpf - CPF do servidor
 * @return {Object} Dados do servidor
 */
function buscarServidorPorCpf(cpf) {
  // Anonimiza CPF para busca
  const cpfHash = anonimizarCpf(cpf);
  // Busca na planilha de servidores
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Servidores');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[2] === cpfHash);
}

/**
 * Lista todos os servidores ativos
 * @return {Array} Lista de servidores
 */
function listarServidoresAtivos() {
  // Busca servidores com status ATIVO
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Servidores');
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[5] === 'ATIVO');
}
