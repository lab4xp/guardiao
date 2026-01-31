// Gerenciamento de notificações na UI

/**
 * Cria notificação na interface
 * @param {string} tipo - Tipo (sucesso, erro, aviso)
 * @param {string} mensagem - Mensagem da notificação
 */
function criarNotificacao(tipo, mensagem) {
  // Registra notificação na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Notificacoes');
  sheet.appendRow([
    new Date(),
    tipo.toUpperCase(),
    mensagem,
    Session.getActiveUser().getEmail(),
    'NAO_LIDA'
  ]);
}

/**
 * Marca notificação como lida
 * @param {number} notificacaoId - ID da notificação (linha)
 */
function marcarNotificacaoLida(notificacaoId) {
  // Atualiza status na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Notificacoes');
  sheet.getRange(notificacaoId, 5).setValue('LIDA');
}
