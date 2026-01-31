/**
 * @fileoverview AuditLogger - Gerenciador de Trilha de Auditoria
 * Registra todas as ações sensíveis realizadas no sistema para fins de compliance.
 */

const AuditLogger = {
  
  /**
   * Registra um evento de auditoria
   * @param {Object} evento - { tipo, acao, dados, status }
   */
  registrar: function(evento) {
    const user = AuthManager.getCurrentUser();
    
    const registro = {
      timestamp: new Date(),
      usuario: user.email,
      perfil: user.role,
      tipo_evento: evento.tipo || 'INFO',
      detalhes: JSON.stringify(evento.dados || {}),
      status: evento.status || 'SUCESSO',
      hash_integridade: this.gerarHashLog(evento)
    };

    // Salva na aba de AuditoriaLGPD via SheetsConnector
    // Nota: Usamos appendRow direto aqui para garantir imutabilidade (sem overwrites)
    try {
      const sheet = SheetsConnector.getSheet('auditoria');
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
      const row = headers.map(h => registro[h] || '');
      
      sheet.appendRow(row);
      console.log(`[AUDIT] ${registro.tipo_evento} por ${registro.usuario}`);
    } catch (e) {
      console.error('Falha crítica ao gravar log de auditoria', e);
    }
  },

  /**
   * Gera um hash para validar que o log não foi alterado manualmente
   * @private
   */
  gerarHashLog: function(evento) {
    const raw = (new Date().getTime()) + JSON.stringify(evento.dados) + 'GDF-SECRET';
    return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw)).substring(0, 16);
  }
};
