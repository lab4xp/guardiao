// Integração com SINPRO-DF

/**
 * Envia dados para SINPRO-DF
 * @param {Object} dados - Dados a enviar
 * @return {Object} Resposta da integração
 */
function enviarParaSinpro(dados) {
  // Obtém URL da API do SINPRO
  const apiUrl = obterConfiguracao('SINPRO_API_URL');
  // Envia requisição
  const response = UrlFetchApp.fetch(apiUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(dados)
  });
  // Retorna resposta
  return JSON.parse(response.getContentText());
}

/**
 * Consulta dados no SINPRO-DF
 * @param {string} matricula - Matrícula do professor
 * @return {Object} Dados do SINPRO
 */
function consultarSinpro(matricula) {
  // Monta URL de consulta
  const apiUrl = obterConfiguracao('SINPRO_API_URL') + '/consulta/' + matricula;
  // Faz requisição GET
  const response = UrlFetchApp.fetch(apiUrl);
  return JSON.parse(response.getContentText());
}
