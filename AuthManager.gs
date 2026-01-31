/**
 * @fileoverview AuthManager - Gerenciamento de Autenticação e Autorização
 * Implementa controle de acesso baseado em roles (RBAC) para o Guardião SEDF.
 */

const AuthManager = {
  
  /**
   * Obtém o usuário atual do sistema
   * @return {Object} Dados do usuário e seu perfil
   */
  getCurrentUser: function() {
    const email = Session.getActiveUser().getEmail();
    const userRecord = this.getUserFromSheet(email);
    
    if (!userRecord) {
      return {
        email: email,
        isAuthenticated: false,
        role: USER_ROLES.VIEWER,
        name: 'Convidado'
      };
    }
    
    return {
      email: email,
      isAuthenticated: true,
      role: userRecord.role,
      name: userRecord.name,
      status: userRecord.status
    };
  },

  /**
   * Verifica se o usuário tem uma determinada permissão
   * @param {string} roleRequired - Role necessária (ex: USER_ROLES.ADMIN)
   * @return {boolean}
   */
  isAuthorized: function(roleRequired) {
    const user = this.getCurrentUser();
    if (!user.isAuthenticated || user.status !== 'ATIVO') return false;
    
    // Admin tem acesso a tudo
    if (user.role === USER_ROLES.ADMIN) return true;
    
    // Lógica simples de hierarquia
    const roles = [USER_ROLES.VIEWER, USER_ROLES.AUDITOR, USER_ROLES.OPERADOR, USER_ROLES.ADMIN];
    return roles.indexOf(user.role) >= roles.indexOf(roleRequired);
  },

  /**
   * Busca dados do usuário na planilha 'Usuarios'
   * @private
   */
  getUserFromSheet: function(email) {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName('Usuarios');
      if (!sheet) return null;

      const data = sheet.getDataRange().getValues();
      // Assume colunas: [0: Email, 1: Nome, 2: Perfil (Role), 3: Status]
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === email) {
          return {
            email: data[i][0],
            name: data[i][1],
            role: data[i][2],
            status: data[i][3]
          };
        }
      }
    } catch (e) {
      Logger.log('Erro ao buscar usuário: ' + e);
    }
    return null;
  },

  /**
   * Registra acesso para auditoria
   */
  logAccess: function() {
    const user = this.getCurrentUser();
    
    // Centraliza o log no AuditLogger para evitar duplicação de lógica e tabelas
    if (typeof AuditLogger !== 'undefined') {
      AuditLogger.registrar({
        tipo: 'LOGIN',
        dados: {
          acao: 'Acesso ao sistema/Módulo',
          usuario: user.email
        },
        status: user.isAuthenticated ? 'SUCESSO' : 'NEGADO'
      });
    } else {
      // Fallback simples se AuditLogger não estiver carregado
      console.log(`[AUTH] Acesso de ${user.email} - ${user.isAuthenticated ? 'ALLOW' : 'DENY'}`);
    }
  },
  
  /**
   * Gera um hash simples para integridade do log (Simulação)
   * @private
   */
  generateSecurityHash: function(data) {
    const salt = 'guardiao-sedf-2026';
    return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, data + salt + new Date().getTime()));
  }
};

/**
 * Funções globais expostas para o Frontend
 */
function getClientSideUser() {
  return AuthManager.getCurrentUser();
}
