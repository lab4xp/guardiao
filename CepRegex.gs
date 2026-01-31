// Regex para CEP brasileiro

/**
 * Retorna regex para CEP no formato brasileiro
 * @return {RegExp} Expressão regular para CEP
 */
function getCepRegex() {
  // Padrão para CEP com ou sem hífen (12345-678 ou 12345678)
  return /\b\d{5}-?\d{3}\b/g;
}

/**
 * Valida se um CEP está no formato correto
 * @param {string} cep - CEP a validar
 * @return {boolean} True se válido
 */
function validarCep(cep) {
  // Remove caracteres não numéricos
  const numeros = cep.replace(/\D/g, '');
  // Verifica se tem exatamente 8 dígitos
  return numeros.length === 8;
}

/**
 * Formata CEP adicionando hífen
 * @param {string} cep - CEP sem formatação
 * @return {string} CEP formatado
 */
function formatarCep(cep) {
  // Remove formatação existente
  const limpo = cep.replace(/\D/g, '');
  // Adiciona hífen na posição correta
  return limpo.substring(0, 5) + '-' + limpo.substring(5);
}
