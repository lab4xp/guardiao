// Gerenciamento de alertas visuais

/**
 * Cria um alerta na planilha de notificações
 * @param {string} tipo - Tipo do alerta (INFO, AVISO, ERRO)
 * @param {string} mensagem - Mensagem do alerta
 */
function criarAlerta(tipo, mensagem) {
  // Acessa a planilha de alertas ativos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Alertas');
  // Insere novo alerta com timestamp e status 'ATIVO'
  sheet.appendRow([new Date(), tipo, mensagem, 'ATIVO', Session.getActiveUser().getEmail()]);
}

/**
 * Marca alertas como lidos pelo usuário
 * @param {number} alertaId - ID da linha do alerta
 */
function marcarAlertaComoLido(alertaId) {
  // Obtém a planilha de alertas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Alertas');
  // Atualiza o status na coluna D para 'LIDO'
  sheet.getRange(alertaId, 4).setValue('LIDO');
}
