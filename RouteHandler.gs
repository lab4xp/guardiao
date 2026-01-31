/**
 * @fileoverview RouteHandler - Gerenciador de Rotas e Componentes UI
 * Orquestra o carregamento dinâmico de páginas HTML (SPA) e endpoints de API.
 */

const RouteHandler = {
  
  /**
   * Mapeamento de rotas para arquivos HTML (Páginas principais)
   */
  ROUTES_MAP: {
    'dashboard': 'MainDashboard',
    'ajuda': 'WelcomeScreen',
    'processamento': 'ProcessPage',
    'relatorios': 'ReportsPage',
    'configuracoes': 'SettingsPage',
    'auditoria': 'AuditPage',
    'login': 'LoginPage'
  },

  /**
   * Carrega e renderiza um componente HTML pelo nome
   */
  loadPage: function(pageName, data = {}) {
    try {
      const user = AuthManager.getCurrentUser();
      
      // Validação de Segurança
      if (pageName === 'AuditPage' && user.role !== USER_ROLES.ADMIN) {
        return this.loadPage('ErrorPage', { message: 'Acesso Negado: Área restrita ao Administrador' });
      }

      // Verifica se o arquivo existe (GAS não tem check fácil de existência de arquivo .html sem try/catch)
      const template = HtmlService.createTemplateFromFile(pageName);
      
      // Dados Globais
      template.user = user;
      template.version = APP_VERSION;
      template.appName = APP_NAME;
      
      // Injeção de dados específicos
      if (data) {
        Object.keys(data).forEach(key => template[key] = data[key]);
      }

      return template.evaluate().getContent();
    } catch (e) {
      console.error('Erro ao carregar página: ' + pageName, e);
      // Fallback para ErrorPage se não for a própria ErrorPage
      if (pageName !== 'ErrorPage') {
        return this.loadPage('ErrorPage', { error: e.toString() });
      }
      return '<div style="color:red; background: black; padding: 20px;">Erro Crítico: Interface Indisponível</div>';
    }
  },

  /**
   * Handler invocado via google.script.run
   */
  navigate: function(targetRoute, params = {}) {
    const pageFile = this.ROUTES_MAP[targetRoute] || 'ErrorPage';
    
    // Log de navegação para auditoria (opcional para UX, mas bom para segurança)
    SystemLogger.info('UI', `Navegação para: ${targetRoute}`);
    
    return this.loadPage(pageFile, params || {});
  }
};

/**
 * Funções globais chamadas pelo Google Script Run (Frontend)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Função principal para SPA (Single Page Application)
 */
function navigateTo(route, params) {
  return RouteHandler.navigate(route, params);
}
