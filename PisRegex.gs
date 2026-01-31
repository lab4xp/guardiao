// Regex para PIS/PASEP

/**
 * Retorna regex para PIS/PASEP
 * @return {RegExp} Expressão regular
 */
function getPisRegex() {
  // Padrão para PIS/PASEP (11 dígitos)
  return /\b\d{3}\.\d{5}\.\d{2}-\d{1}\b|\b\d{11}\b/g;
}

/**
 * Valida número de PIS/PASEP
 * @param {string} pis - PIS a validar
 * @return {boolean} True se válido
 */
function validarPis(pis) {
  // Remove formatação
  const limpo = pis.replace(/\D/g, '');
  // Verifica tamanho
  return limpo.length === 11;
}

/**
 * Formata PIS no padrão brasileiro
 * @param {string} pis - PIS sem formatação
 * @return {string} PIS formatado
 */
function formatarPis(pis) {
  // Remove formatação
  const limpo = pis.replace(/\D/g, '');
  // Aplica máscara XXX.XXXXX.XX-X
  return `${limpo.substring(0, 3)}.${limpo.substring(3, 8)}.${limpo.substring(8, 10)}-${limpo.substring(10)}`;
}
