/**
 * @fileoverview SessionManager - Controle de Sessões de Usuário
 * Gerencia ciclo de vida, expiração e validação de sessões via CacheService.
 */

const SessionManager = {

  // Tempo de expiração padrão: 1 hora (3600 segundos)
  SESSION_TIMEOUT: 3600,

  /**
   * Cria nova sessão de usuário
   * @param {string} email - Email do usuário
   * @return {string} ID da sessão
   */
  criarSessao: function(email) {
    const sessionId = 'SESS-' + new Date().getTime() + '-' + Utilities.getUuid().substring(0, 8);
    
    const dadosSessao = {
      email: email,
      inicio: new Date().getTime(),
      ativa: true,
      userAgent: 'GAS-Client' // Poderia vir de um parametro se disponível
    };

    // Armazena sessão no cache via CacheManager (ou direto se CacheManager não tiver 'put')
    // CacheManager.put não existe na interface lida acima, apenas getOrFetch e clear.
    // Vou usar CacheService direto aqui ou implementar put no CacheManager.
    // Como CacheManager.gs mostrou apenas getOrFetch e clear, vou usar CacheService direto para PUT.
    CacheService.getScriptCache().put(sessionId, JSON.stringify(dadosSessao), this.SESSION_TIMEOUT);
    
    return sessionId;
  },

  /**
   * Valida sessão de usuário
   * @param {string} sessionId - ID da sessão
   * @return {boolean} True se sessão válida
   */
  validarSessao: function(sessionId) {
    if (!sessionId) return false;

    // Usa CacheManager para leitura consistentes
    const dados = CacheManager.getOrFetch(sessionId, this.SESSION_TIMEOUT, () => null);
    
    if (!dados) return false;
    
    // Check extra de integridade
    return dados.ativa === true;
  },

  /**
   * Obtém dados da sessão atual
   */
  getSessao: function(sessionId) {
     const dados = CacheManager.getOrFetch(sessionId, this.SESSION_TIMEOUT, () => null);
     return dados;
  },

  /**
   * Encerra sessão de usuário
   * @param {string} sessionId - ID da sessão
   */
  encerrarSessao: function(sessionId) {
    CacheManager.clear(sessionId);
  }
};
