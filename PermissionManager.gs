/**
 * @fileoverview PermissionManager - Gerenciamento de Permissões de Arquivos
 * Facilita a concessão de acessos no Drive de forma auditada.
 */
const PermissionManager = {

  /**
   * Concede permissão de leitura em arquivo
   * @param {string} fileId - ID do arquivo
   * @param {string} email - Email do usuário
   */
  concederPermissaoLeitura: function(fileId, email) {
    try {
      // Obtém arquivo do Drive
      const file = DriveApp.getFileById(fileId);
      
      // Adiciona leitor (Suppress notifications)
      file.addViewer(email);
      
      // Registra concessão via AuditLogger
      AuditLogger.registrar({
        tipo: 'PERMISSAO_CONCEDIDA',
        dados: { 
          fileId: fileId, 
          targetUser: email, 
          nivel: 'LEITURA' 
        },
        status: 'SUCESSO'
      });
      
      return true;
    } catch (e) {
      console.error('Erro ao conceder permissão', e);
      return false;
    }
  },

  /**
   * Revoga todas as permissões de um usuário em arquivo
   * @param {string} fileId - ID do arquivo
   * @param {string} email - Email do usuário
   */
  revogarPermissoes: function(fileId, email) {
    try {
      const file = DriveApp.getFileById(fileId);
      
      file.removeViewer(email);
      file.removeEditor(email);
      
      AuditLogger.registrar({
        tipo: 'PERMISSAO_REVOGADA',
        dados: { 
          fileId: fileId, 
          targetUser: email 
        },
        status: 'SUCESSO'
      });
      
      return true;
    } catch (e) {
       console.error('Erro ao revogar permissão', e);
       return false;
    }
  }
};
