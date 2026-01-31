// Monitoramento de performance

/**
 * Registra métrica de performance
 * @param {string} operacao - Nome da operação
 * @param {number} tempoMs - Tempo em milissegundos
 */
function registrarMetricaPerformance(operacao, tempoMs) {
  // Acessa planilha de métricas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MetricasPerformance');
  // Adiciona registro
  sheet.appendRow([
    new Date(),
    operacao,
    tempoMs,
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * Executa função medindo tempo de execução
 * @param {Function} funcao - Função a executar
 * @param {string} nomeOperacao - Nome da operação
 * @return {*} Resultado da função
 */
function executarComMonitoramento(funcao, nomeOperacao) {
  // Marca tempo inicial
  const inicio = new Date().getTime();
  // Executa função
  const resultado = funcao();
  // Calcula tempo decorrido
  const fim = new Date().getTime();
  const tempoMs = fim - inicio;
  // Registra métrica
  registrarMetricaPerformance(nomeOperacao, tempoMs);
  return resultado;
}
