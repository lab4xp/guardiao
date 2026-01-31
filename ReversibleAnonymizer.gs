// Anonimização reversível para auditoria interna

/**
 * Anonimiza dado de forma reversível
 * @param {string} valor - Valor a anonimizar
 * @param {string} chave - Chave de criptografia
 * @return {string} Valor anonimizado
 */
function anonimizarReversivel(valor, chave) {
  // Gera hash do valor com chave
  const hash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    valor + chave
  );
  const hashStr = Utilities.base64Encode(hash).substring(0, 16);
  // Armazena mapeamento seguro
  armazenarMapeamentoHash(hashStr, valor);
  return hashStr;
}

/**
 * Reverte anonimização
 * @param {string} valorAnonimizado - Valor anonimizado
 * @param {string} justificativa - Justificativa para reversão
 * @return {string} Valor original
 */
function reverterAnonimizacao(valorAnonimizado, justificativa) {
  // Registra reversão para auditoria
  logInfo('Reversão de anonimização', {
    valor: valorAnonimizado,
    justificativa: justificativa,
    usuario: Session.getActiveUser().getEmail()
  });
  // Recupera valor original
  return reverterHash(valorAnonimizado);
}
