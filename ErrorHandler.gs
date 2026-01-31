// Tratamento centralizado de erros e exceções

/**
 * Trata erro de forma centralizada
 * @param {Error} erro - Objeto de erro
 * @param {string} contexto - Contexto onde ocorreu o erro
 */
function tratarErro(erro, contexto) {
  // Registra erro no log
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogErros');
  sheet.appendRow([
    new Date(),
    contexto,
    erro.message,
    erro.stack,
    Session.getActiveUser().getEmail()
  ]);
  // Envia notificação se erro crítico
  if (isErroCritico(erro)) {
    notificarErroCritico(erro, contexto);
  }
}

/**
 * Verifica se erro é crítico
 * @param {Error} erro - Objeto de erro
 * @return {boolean} True se crítico
 */
function isErroCritico(erro) {
  // Define erros críticos
  const errosCriticos = ['QuotaExceeded', 'PermissionDenied', 'ServiceUnavailable'];
  return errosCriticos.some(tipo => erro.message.includes(tipo));
}
