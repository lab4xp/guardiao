// Regex para contas bancárias

/**
 * Retorna regex para detectar contas bancárias
 * @return {RegExp} Expressão regular
 */
function getContaBancariaRegex() {
  // Padrão para agência e conta (formato: 1234-5 / 12345678-9)
  return /\b\d{4}-?\d{1}\s*\/?\s*\d{5,8}-?\d{1}\b/g;
}

/**
 * Valida formato de conta bancária
 * @param {string} conta - Conta a validar
 * @return {boolean} True se válida
 */
function validarContaBancaria(conta) {
  // Verifica se contém agência e número de conta
  const regex = getContaBancariaRegex();
  return regex.test(conta);
}

/**
 * Anonimiza número de conta bancária
 * @param {string} conta - Conta a anonimizar
 * @return {string} Conta anonimizada
 */
function anonimizarContaBancaria(conta) {
  // Substitui dígitos por asteriscos mantendo apenas últimos 2
  return conta.replace(/\d(?=\d{2})/g, '*');
}
