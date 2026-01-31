// Recuperação de dados em caso de falha

/**
 * Cria ponto de recuperação
 * @param {string} operacao - Nome da operação
 * @param {Object} dados - Dados a salvar
 * @return {string} ID do ponto de recuperação
 */
function criarPontoRecuperacao(operacao, dados) {
  // Gera ID único
  const id = 'REC-' + new Date().getTime();
  // Salva dados na planilha de recuperação
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PontosRecuperacao');
  sheet.appendRow([
    id,
    new Date(),
    operacao,
    JSON.stringify(dados)
  ]);
  return id;
}

/**
 * Recupera dados de um ponto de recuperação
 * @param {string} pontoId - ID do ponto de recuperação
 * @return {Object} Dados recuperados
 */
function recuperarDados(pontoId) {
  // Busca ponto na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PontosRecuperacao');
  const dados = sheet.getDataRange().getValues();
  const ponto = dados.find(row => row[0] === pontoId);
  // Parse e retorna dados
  return ponto ? JSON.parse(ponto[3]) : null;
}
