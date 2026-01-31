/**
 * @fileoverview OfflineHandlers - Handlers do Servidor para Sincronia Offline
 * Métodos chamados para processar dados que vieram do Cache Local (IndexedDB).
 */

/**
 * Processa documento enviado enquanto o usuário estava sem internet
 */
function processarDocumentoOffline(data) {
  SystemLogger.info('OFFLINE', `Processando sincronia de documento: ${data.nome || 'Sem Nome'}`);
  
  // Integra com o PiiDetector principal
  const resultado = PiiDetector.detectarEAnonimizar(data.texto);
  
  // Salva na planilha de auditoria como vindo de sincronia
  AuditLogger.registrar({
    tipo: 'SYNC_OFFLINE',
    dados: { 
      acao: 'PROCESSAMENTO_DOC',
      idOriginal: data.id,
      piisEncontrados: resultado.deteccoes.length
    },
    status: 'SUCESSO'
  });

  return { 
    id: data.id, 
    status: 'SYNCED', 
    deteccoes: resultado.deteccoes.length 
  };
}

/**
 * Registra evento de auditoria que aconteceu offline
 */
function registrarEventoAudit(data) {
  SystemLogger.info('OFFLINE', `Registrando evento audit sincronizado: ${data.tipo}`);
  
  return AuditLogger.registrar({
    tipo: data.tipo,
    dados: data.dados,
    status: 'SUCESSO_SYNC'
  });
}

/**
 * Endpoint para obter informações do usuário para o widget mobile
 */
function getClientSideUser() {
  const user = AuthManager.getCurrentUser();
  return {
    name: user.email.split('@')[0],
    email: user.email,
    role: user.role,
    isMobile: true // Flag para UI
  };
}
