// Rastreamento de atividades de usuários

/**
 * Registra uma atividade do usuário na planilha de auditoria
 * @param {string} acao - Ação realizada pelo usuário
 * @param {string} detalhes - Detalhes adicionais da ação
 */
function registrarAtividade(acao, detalhes) {
  // Obtém a planilha de log de atividades
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogAtividades');
  // Adiciona nova linha com timestamp, usuário, ação e detalhes
  sheet.appendRow([new Date(), Session.getActiveUser().getEmail(), acao, detalhes]);
}

/**
 * Busca atividades de um usuário específico
 * @param {string} email - Email do usuário
 * @return {Array} Lista de atividades
 */
function buscarAtividadesUsuario(email) {
  // Acessa a planilha de log
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogAtividades');
  // Filtra registros pelo email do usuário na coluna B
  return sheet.getDataRange().getValues().filter(row => row[1] === email);
}
