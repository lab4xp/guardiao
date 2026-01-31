// Regex para CNH (Carteira Nacional de Habilitação)

/**
 * Retorna regex para detectar números de CNH
 * @return {RegExp} Expressão regular para CNH
 */
function getCnhRegex() {
  // Padrão para CNH com 11 dígitos
  return /\b\d{11}\b/g;
}

/**
 * Valida número de CNH
 * @param {string} cnh - Número da CNH
 * @return {boolean} True se válido
 */
function validarCnh(cnh) {
  // Remove caracteres não numéricos
  const numeros = cnh.replace(/\D/g, '');
  // Verifica se tem exatamente 11 dígitos
  return numeros.length === 11 && /^\d+$/.test(numeros);
}

/**
 * Anonimiza número de CNH
 * @param {string} cnh - CNH a anonimizar
 * @return {string} CNH anonimizada
 */
function anonimizarCnh(cnh) {
  // Mantém apenas os 3 primeiros dígitos
  const limpo = cnh.replace(/\D/g, '');
  // Substitui o restante por asteriscos
  return limpo.substring(0, 3) + '********';
}
