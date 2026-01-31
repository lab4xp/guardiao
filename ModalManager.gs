// Gerenciamento de modais

/**
 * Exibe modal personalizado
 * @param {string} titulo - Título do modal
 * @param {string} conteudo - Conteúdo HTML
 */
function exibirModal(titulo, conteudo) {
  // Cria output HTML
  const html = HtmlService.createHtmlOutput(conteudo)
    .setWidth(600)
    .setHeight(400);
  // Exibe modal
  SpreadsheetApp.getUi().showModalDialog(html, titulo);
}

/**
 * Exibe modal de confirmação
 * @param {string} mensagem - Mensagem de confirmação
 * @return {boolean} True se confirmado
 */
function exibirConfirmacao(mensagem) {
  // Exibe diálogo de confirmação
  const ui = SpreadsheetApp.getUi();
  const resposta = ui.alert('Confirmação', mensagem, ui.ButtonSet.YES_NO);
  return resposta === ui.Button.YES;
}
