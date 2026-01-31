// Limitador de taxa de requisições

/**
 * Verifica se pode fazer requisição (rate limiting)
 * @param {string} chave - Chave do rate limit (ex: usuário, IP)
 * @param {number} limite - Limite de requisições
 * @param {number} janelaTempo - Janela de tempo em segundos
 * @return {boolean} True se pode fazer requisição
 */
function podeRequisitar(chave, limite, janelaTempo) {
  // Obtém contador do cache
  const cacheKey = 'RATE_' + chave;
  const contador = parseInt(obterDoCache(cacheKey)) || 0;
  // Verifica se excedeu limite
  if (contador >= limite) {
    return false;
  }
  // Incrementa contador
  armazenarNoCache(cacheKey, (contador + 1).toString(), janelaTempo);
  return true;
}

/**
 * Registra requisição bloqueada
 * @param {string} chave - Chave bloqueada
 */
function registrarBloqueio(chave) {
  // Registra bloqueio na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RateLimitBloqueios');
  sheet.appendRow([new Date(), chave, 'BLOQUEADO']);
}
