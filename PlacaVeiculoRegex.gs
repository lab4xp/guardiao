// Regex para placas de veículos

/**
 * Retorna regex para placas de veículos
 * @return {RegExp} Expressão regular
 */
function getPlacaVeiculoRegex() {
  // Padrão para placa Mercosul e antiga
  return /\b[A-Z]{3}-?\d{1}[A-Z]{1}\d{2}\b|\b[A-Z]{3}-?\d{4}\b/g;
}

/**
 * Valida placa de veículo
 * @param {string} placa - Placa a validar
 * @return {boolean} True se válida
 */
function validarPlacaVeiculo(placa) {
  // Remove hífen
  const limpo = placa.replace(/-/g, '');
  // Verifica formato Mercosul ou antigo
  return /^[A-Z]{3}\d[A-Z]\d{2}$/.test(limpo) || /^[A-Z]{3}\d{4}$/.test(limpo);
}

/**
 * Anonimiza placa de veículo
 * @param {string} placa - Placa a anonimizar
 * @return {string} Placa anonimizada
 */
function anonimizarPlacaVeiculo(placa) {
  // Mantém apenas as 3 letras iniciais
  return placa.substring(0, 3) + '-****';
}
