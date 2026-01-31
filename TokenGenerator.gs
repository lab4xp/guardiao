// Geração de tokens de autenticação

/**
 * Gera token de autenticação
 * @param {string} email - Email do usuário
 * @return {string} Token gerado
 */
function gerarToken(email) {
  // Gera token único baseado em email e timestamp
  const dados = email + new Date().getTime();
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, dados);
  const token = Utilities.base64Encode(hash);
  // Armazena token no cache (válido por 1 hora)
  armazenarNoCache('TOKEN_' + email, token, 3600);
  return token;
}

/**
 * Valida token de autenticação
 * @param {string} email - Email do usuário
 * @param {string} token - Token a validar
 * @return {boolean} True se válido
 */
function validarToken(email, token) {
  // Busca token armazenado
  const tokenArmazenado = obterDoCache('TOKEN_' + email);
  // Compara tokens
  return tokenArmazenado === token;
}
