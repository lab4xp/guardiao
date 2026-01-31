// Construtor de respostas HTTP padronizadas

/**
 * Constrói resposta de sucesso
 * @param {Object} dados - Dados da resposta
 * @return {Object} Resposta HTTP
 */
function construirRespostaSucesso(dados) {
  // Cria resposta padronizada
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: dados,
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Constrói resposta de erro
 * @param {string} mensagem - Mensagem de erro
 * @param {number} codigo - Código HTTP
 * @return {Object} Resposta HTTP
 */
function construirRespostaErro(mensagem, codigo) {
  // Cria resposta de erro
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: mensagem,
    code: codigo,
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}
