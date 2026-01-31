// Gerenciamento de CORS para requisições cross-origin

/**
 * Adiciona headers CORS à resposta
 * @param {Object} response - Objeto de resposta
 * @return {Object} Resposta com headers CORS
 */
function adicionarHeadersCors(response) {
  // Define headers CORS permitindo todas as origens
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Trata requisições OPTIONS para CORS preflight
 * @return {Object} Resposta para preflight
 */
function tratarPreflightCors() {
  // Retorna resposta vazia com headers CORS
  return ContentService.createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
