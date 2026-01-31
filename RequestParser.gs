// Parser de requisições HTTP

/**
 * Parse requisição GET
 * @param {Object} e - Evento da requisição
 * @return {Object} Parâmetros parseados
 */
function parseGetRequest(e) {
  // Extrai parâmetros da query string
  const params = e.parameter || {};
  // Retorna objeto com parâmetros
  return {
    method: 'GET',
    params: params,
    user: Session.getActiveUser().getEmail()
  };
}

/**
 * Parse requisição POST
 * @param {Object} e - Evento da requisição
 * @return {Object} Dados parseados
 */
function parsePostRequest(e) {
  // Parse corpo JSON
  const body = e.postData ? JSON.parse(e.postData.contents) : {};
  // Retorna objeto com dados
  return {
    method: 'POST',
    body: body,
    user: Session.getActiveUser().getEmail()
  };
}
