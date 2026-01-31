// Regex para telefones brasileiros com DDD

/**
 * Retorna regex para telefones brasileiros
 * @return {RegExp} Expressão regular
 */
function getTelefoneRegex() {
  // Padrão para telefone com DDD (11) 98765-4321 ou 11987654321
  return /\(?\d{2}\)?\s*9?\d{4}-?\d{4}/g;
}

/**
 * Valida número de telefone brasileiro
 * @param {string} telefone - Telefone a validar
 * @return {boolean} True se válido
 */
function validarTelefone(telefone) {
  // Remove formatação
  const numeros = telefone.replace(/\D/g, '');
  // Valida tamanho (10 ou 11 dígitos com DDD)
  return numeros.length === 10 || numeros.length === 11;
}

/**
 * Formata telefone no padrão brasileiro
 * @param {string} telefone - Telefone sem formatação
 * @return {string} Telefone formatado
 */
function formatarTelefone(telefone) {
  // Remove formatação
  const limpo = telefone.replace(/\D/g, '');
  // Aplica máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (limpo.length === 11) {
    return `(${limpo.substring(0, 2)}) ${limpo.substring(2, 7)}-${limpo.substring(7)}`;
  } else {
    return `(${limpo.substring(0, 2)}) ${limpo.substring(2, 6)}-${limpo.substring(6)}`;
  }
}
