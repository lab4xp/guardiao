// Gerenciamento de chaves de API

/**
 * Armazena chave de API de forma segura nas propriedades do script
 * @param {string} servico - Nome do serviço
 * @param {string} chave - Chave da API
 */
function armazenarChaveApi(servico, chave) {
  // Usa PropertiesService para armazenamento seguro
  const props = PropertiesService.getScriptProperties();
  // Salva a chave com prefixo para organização
  props.setProperty('API_KEY_' + servico.toUpperCase(), chave);
}

/**
 * Recupera chave de API armazenada
 * @param {string} servico - Nome do serviço
 * @return {string} Chave da API
 */
function obterChaveApi(servico) {
  // Acessa as propriedades do script
  const props = PropertiesService.getScriptProperties();
  // Retorna a chave correspondente ao serviço
  return props.getProperty('API_KEY_' + servico.toUpperCase());
}

/**
 * Remove chave de API do armazenamento
 * @param {string} servico - Nome do serviço
 */
function removerChaveApi(servico) {
  // Acessa propriedades do script
  const props = PropertiesService.getScriptProperties();
  // Deleta a propriedade da chave
  props.deleteProperty('API_KEY_' + servico.toUpperCase());
}
