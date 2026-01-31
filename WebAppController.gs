/**
 * @fileoverview WebAppController - Ponto de Entrada da UI
 * Gerencia a renderização inicial da interface Web.
 */

/**
 * Ponto de entrada que o Google Apps Script chama ao acessar a URL do Web App
 */
function doGet(e) {
  // 1. Auditoria de acesso imediata
  AuthManager.logAccess();

  // 2. Prepara os dados para o template (SPA)
  const template = HtmlService.createTemplateFromFile('Index');
  template.user = AuthManager.getCurrentUser();
  template.systemName = APP_NAME;
  template.systemVersion = APP_VERSION;

  // 3. Renderiza com permissão de frames e título moderno
  return template.evaluate()
    .setTitle(APP_NAME + ' | Proteção Inteligente')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Função global para carregar componentes via AJAX do Google Script Run
 */
function navigateTo(route, params) {
  return RouteHandler.navigate(route, params);
}
