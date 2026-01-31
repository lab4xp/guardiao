// Regex otimizado para e-mail (RFC compliant)

/**
 * Retorna regex para detecção de emails
 * @return {RegExp} Expressão regular
 */
function getEmailRegex() {
  // Padrão RFC compliant simplificado
  return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
}

/**
 * Valida email conforme RFC 5322
 * @param {string} email - Email a validar
 * @return {boolean} True se válido
 */
function validarEmailRfc(email) {
  // Regex mais rigoroso para validação
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}
