// Regex para endereços brasileiros

/**
 * Retorna regex para detecção de logradouros
 * @return {RegExp} Expressão regular
 */
function getLogradouroRegex() {
  // Padrão para tipos de logradouro comuns no Brasil
  return /(?:Rua|Avenida|Av\.|Travessa|Alameda|Praça|Rodovia|Estrada|Via)\s+[A-Za-zÀ-ÿ0-9\s]+/gi;
}

/**
 * Retorna regex para CEP brasileiro
 * @return {RegExp} Expressão regular para CEP
 */
function getCepRegex() {
  // Padrão para CEP com ou sem hífen
  return /\d{5}-?\d{3}/g;
}
