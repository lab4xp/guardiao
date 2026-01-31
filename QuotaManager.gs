// Gerenciamento de quotas da API do Google

/**
 * Verifica quota disponível
 * @param {string} servico - Nome do serviço
 * @return {Object} Status da quota
 */
function verificarQuota(servico) {
  // Busca quota na planilha de configurações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Quotas');
  const dados = sheet.getDataRange().getValues();
  const quota = dados.find(row => row[0] === servico);
  // Retorna status
  return {
    servico: servico,
    usado: quota[1],
    limite: quota[2],
    disponivel: quota[2] - quota[1],
    percentual: (quota[1] / quota[2] * 100).toFixed(2)
  };
}

/**
 * Incrementa uso de quota
 * @param {string} servico - Nome do serviço
 * @param {number} quantidade - Quantidade a incrementar
 */
function incrementarQuota(servico, quantidade) {
  // Atualiza quota na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Quotas');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === servico) + 1;
  const usoAtual = dados[linha - 1][1];
  sheet.getRange(linha, 2).setValue(usoAtual + quantidade);
}
