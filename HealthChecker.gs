// Verificação de saúde do sistema

/**
 * Executa verificação de saúde do sistema
 * @return {Object} Status de saúde
 */
function verificarSaudeDoSistema() {
  // Verifica conectividade com planilhas
  const planilhasOk = verificarPlanilhas();
  
  // Verifica quota de API (Verifica serviços críticos)
  const quotaOk = verificarQuotasCriticas(); // Função renomeada para clareza
  
  // Verifica serviços externos
  const servicosOk = verificarServicosExternos();
  
  // Retorna status geral
  return {
    saudavel: planilhasOk && quotaOk && servicosOk.sucesso,
    planilhas: planilhasOk,
    quota: quotaOk,
    servicos: servicosOk,
    timestamp: new Date()
  };
}

/**
 * Verifica se planilhas estão acessíveis
 * @return {boolean} True se OK
 */
function verificarPlanilhas() {
  try {
    // Tenta acessar planilha principal
    SpreadsheetApp.getActiveSpreadsheet().getName();
    return true;
  } catch (e) {
    console.error('Erro ao acessar planilhas: ' + e);
    return false;
  }
}

/**
 * Verifica serviços externos (IA/Ngrok)
 * @return {Object} Status da conexão {sucesso, detalhe}
 */
function verificarServicosExternos() {
  // Usa o conector existente
  if (typeof ColabConnector !== 'undefined') {
    return ColabConnector.testarConexao();
  }
  return { sucesso: false, erro: 'Módulo ColabConnector não encontrado' };
}

/**
 * Verifica quotas de serviços críticos
 * @return {boolean} True se quotas estiverem ok
 */
function verificarQuotasCriticas() {
  try {
    // Na falta de um QuotaManager global, retornamos true ou implementamos check básico
    if (typeof QuotaManager !== 'undefined' && typeof QuotaManager.verificarQuota === 'function') {
      const emailQuota = QuotaManager.verificarQuota('Email');
      // Adicionar outras verificações se necessário
      return emailQuota.disponivel > 0;
    }
    // Fallback simples se QuotaManager não estiver carregado ou configurado
    return MailApp.getRemainingDailyQuota() > 0;
  } catch (e) {
    console.warn('Não foi possível verificar quotas: ' + e);
    return true; // Assume OK para não bloquear, mas loga erro
  }
}
