// Atualização automática da URL do Ngrok

/**
 * Atualiza URL do Ngrok na configuração
 * @param {string} novaUrl - Nova URL do túnel Ngrok
 */
function atualizarUrlNgrok(novaUrl) {
  // Valida URL
  if (!novaUrl.includes('ngrok')) {
    throw new Error('URL inválida do Ngrok');
  }
  // Atualiza na planilha de configurações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConfigAPI');
  sheet.getRange('B3').setValue(novaUrl);
  // Registra atualização
  logInfo('URL Ngrok atualizada', { url: novaUrl });
}

/**
 * Verifica se URL do Ngrok está ativa
 * @return {boolean} True se ativa
 */
function verificarNgrokAtivo() {
  // Obtém URL configurada
  const url = obterUrlNgrok();
  try {
    // Tenta fazer requisição
    UrlFetchApp.fetch(url + '/health', { muteHttpExceptions: true });
    return true;
  } catch (e) {
    return false;
  }
}
