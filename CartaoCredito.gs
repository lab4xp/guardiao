// Regex para números de cartão de crédito

/**
 * Retorna regex para detectar números de cartão de crédito
 * @return {RegExp} Expressão regular
 */
function getCartaoCreditoRegex() {
  // Padrão para cartões com 13-19 dígitos
  return /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
}

/**
 * Valida número de cartão usando algoritmo de Luhn
 * @param {string} numero - Número do cartão
 * @return {boolean} True se válido
 */
function validarCartaoCredito(numero) {
  // Remove espaços e hífens
  const limpo = numero.replace(/[\s-]/g, '');
  // Aplica algoritmo de Luhn para validação
  let soma = 0;
  let alternar = false;
  for (let i = limpo.length - 1; i >= 0; i--) {
    let digito = parseInt(limpo.charAt(i));
    if (alternar) digito *= 2;
    if (digito > 9) digito -= 9;
    soma += digito;
    alternar = !alternar;
  }
  return soma % 10 === 0;
}
