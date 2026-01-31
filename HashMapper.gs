// Mapeamento de hashes para reversão controlada

/**
 * Armazena mapeamento de hash para valor original
 * @param {string} hash - Hash gerado
 * @param {string} valorOriginal - Valor original (criptografado)
 */
function armazenarMapeamentoHash(hash, valorOriginal) {
  // Usa PropertiesService para armazenamento seguro
  const props = PropertiesService.getScriptProperties();
  // Armazena mapeamento
  props.setProperty('HASH_' + hash, valorOriginal);
}

/**
 * Recupera valor original a partir do hash
 * @param {string} hash - Hash a reverter
 * @return {string} Valor original ou null
 */
function reverterHash(hash) {
  // Busca mapeamento nas propriedades
  const props = PropertiesService.getScriptProperties();
  // Retorna valor original se existir
  return props.getProperty('HASH_' + hash);
}

/**
 * Remove mapeamento de hash
 * @param {string} hash - Hash a remover
 */
function removerMapeamentoHash(hash) {
  // Remove das propriedades
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty('HASH_' + hash);
}
