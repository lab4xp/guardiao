// Geração de timestamps para auditoria

/**
 * Gera timestamp RFC 3339
 * @return {string} Timestamp formatado
 */
function gerarTimestamp() {
  // Gera timestamp no formato ISO 8601
  return new Date().toISOString();
}

/**
 * Gera timestamp Unix (epoch)
 * @return {number} Timestamp Unix
 */
function gerarTimestampUnix() {
  // Retorna milissegundos desde epoch
  return new Date().getTime();
}

/**
 * Converte timestamp para data legível
 * @param {number} timestamp - Timestamp Unix
 * @return {string} Data formatada
 */
function formatarTimestamp(timestamp) {
  // Converte para data e formata
  const data = new Date(timestamp);
  return Utilities.formatDate(data, 'GMT-3', 'dd/MM/yyyy HH:mm:ss');
}
