// Circuit breaker para falhas do serviço de IA

/**
 * Verifica se o circuit breaker está aberto
 * @return {boolean} True se o serviço está indisponível
 */
function isCircuitBreakerAberto() {
  // Busca status na planilha de configurações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConfigServicos');
  // Retorna true se o circuit breaker está ABERTO
  return sheet.getRange('B2').getValue() === 'ABERTO';
}

/**
 * Abre o circuit breaker após múltiplas falhas
 */
function abrirCircuitBreaker() {
  // Acessa planilha de configurações de serviços
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConfigServicos');
  // Define status como ABERTO e registra timestamp
  sheet.getRange('B2').setValue('ABERTO');
  sheet.getRange('C2').setValue(new Date());
}

/**
 * Fecha o circuit breaker após período de recuperação
 */
function fecharCircuitBreaker() {
  // Acessa configurações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConfigServicos');
  // Restaura status para FECHADO
  sheet.getRange('B2').setValue('FECHADO');
}
