// Renderização de templates HTML

/**
 * Renderiza template HTML com dados
 * @param {string} templateName - Nome do arquivo de template
 * @param {Object} dados - Dados para o template
 * @return {HtmlOutput} HTML renderizado
 */
function renderizarTemplate(templateName, dados) {
  // Carrega template HTML
  const template = HtmlService.createTemplateFromFile(templateName);
  // Injeta dados no template
  Object.keys(dados).forEach(chave => {
    template[chave] = dados[chave];
  });
  // Retorna HTML renderizado
  return template.evaluate();
}

/**
 * Inclui arquivo HTML parcial
 * @param {string} filename - Nome do arquivo
 * @return {string} Conteúdo do arquivo
 */
function incluirHtml(filename) {
  // Carrega e retorna conteúdo do arquivo
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
