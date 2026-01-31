// Sistema de logging estruturado

/**
 * Registra log estruturado
 * @param {string} nivel - Nível do log (INFO, WARN, ERROR)
 * @param {string} mensagem - Mensagem do log
 * @param {Object} contexto - Contexto adicional
 */
function log(nivel, mensagem, contexto) {
  // Acessa planilha de logs
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs');
  // Adiciona registro estruturado
  sheet.appendRow([
    new Date(),
    nivel,
    mensagem,
    JSON.stringify(contexto || {}),
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * Log de nível INFO
 * @param {string} mensagem - Mensagem
 * @param {Object} contexto - Contexto
 */
function logInfo(mensagem, contexto) {
  log('INFO', mensagem, contexto);
}

/**
 * Log de nível ERROR
 * @param {string} mensagem - Mensagem
 * @param {Object} contexto - Contexto
 */
function logError(mensagem, contexto) {
  log('ERROR', mensagem, contexto);
}
