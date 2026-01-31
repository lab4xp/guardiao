// Exibição de erros para usuário

/**
 * Exibe mensagem de erro formatada
 * @param {string} mensagem - Mensagem de erro
 * @param {string} detalhes - Detalhes técnicos
 */
function exibirErro(mensagem, detalhes) {
  // Registra erro na planilha de logs
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogErros');
  sheet.appendRow([new Date(), mensagem, detalhes, Session.getActiveUser().getEmail()]);
  // Exibe alerta para o usuário
  SpreadsheetApp.getUi().alert('Erro', mensagem, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Registra erro sem exibir para usuário
 * @param {Error} erro - Objeto de erro
 */
function registrarErroSilencioso(erro) {
  // Registra apenas no log
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogErros');
  sheet.appendRow([
    new Date(),
    erro.message,
    erro.stack,
    Session.getActiveUser().getEmail()
  ]);
}
