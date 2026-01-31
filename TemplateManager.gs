// Gerenciamento de templates de e-mail

/**
 * Carrega template de email
 * @param {string} nomeTemplate - Nome do template
 * @return {string} Conteúdo do template
 */
function carregarTemplate(nomeTemplate) {
  // Busca template na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TemplatesEmail');
  const dados = sheet.getDataRange().getValues();
  const template = dados.find(row => row[0] === nomeTemplate);
  return template ? template[1] : '';
}

/**
 * Renderiza template com dados
 * @param {string} template - Template com placeholders
 * @param {Object} dados - Dados para substituir
 * @return {string} Template renderizado
 */
function renderizarTemplateEmail(template, dados) {
  // Substitui placeholders pelos dados
  let resultado = template;
  Object.keys(dados).forEach(chave => {
    const placeholder = '{{' + chave + '}}';
    resultado = resultado.replace(new RegExp(placeholder, 'g'), dados[chave]);
  });
  return resultado;
}
