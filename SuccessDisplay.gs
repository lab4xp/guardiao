// Exibição de mensagens de sucesso

/**
 * Exibe mensagem de sucesso
 * @param {string} mensagem - Mensagem a exibir
 */
function exibirSucesso(mensagem) {
  // Exibe toast de sucesso
  SpreadsheetApp.getActiveSpreadsheet().toast(mensagem, 'Sucesso', 3);
}

/**
 * Registra sucesso na planilha
 * @param {string} operacao - Operação realizada
 * @param {string} detalhes - Detalhes da operação
 */
function registrarSucesso(operacao, detalhes) {
  // Registra na planilha de sucessos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogSucessos');
  sheet.appendRow([
    new Date(),
    operacao,
    detalhes,
    Session.getActiveUser().getEmail()
  ]);
}
