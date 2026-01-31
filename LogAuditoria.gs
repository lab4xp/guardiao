// Modelo de dados para logs de auditoria

/**
 * Cria registro de log de auditoria
 * @param {string} acao - Ação realizada
 * @param {string} recurso - Recurso afetado
 * @param {Object} detalhes - Detalhes adicionais
 * @return {Object} Objeto de log
 */
function criarLogAuditoria(acao, recurso, detalhes) {
  // Cria objeto de log estruturado
  return {
    timestamp: new Date(),
    usuario: Session.getActiveUser().getEmail(),
    acao: acao,
    recurso: recurso,
    detalhes: detalhes,
    ip: Session.getTemporaryActiveUserKey() // Identificador de sessão
  };
}

/**
 * Salva log de auditoria na planilha
 * @param {Object} log - Log a salvar
 */
function salvarLogAuditoria(log) {
  // Acessa planilha de auditoria
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AuditoriaLGPD');
  // Adiciona registro
  sheet.appendRow([
    log.timestamp,
    log.usuario,
    log.acao,
    log.recurso,
    JSON.stringify(log.detalhes)
  ]);
}
