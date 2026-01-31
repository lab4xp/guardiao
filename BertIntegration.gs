// Integração com BERTimbau

/**
 * Envia texto para análise via API do BERTimbau
 * @param {string} texto - Texto para análise
 * @return {Object} Resultado da análise NER
 */
function analisarComBert(texto) {
  // Obtém URL da API configurada
  const apiUrl = obterChaveApi('BERT_API_URL');
  // Prepara payload com o texto
  const payload = { text: texto };
  // Envia requisição POST para a API
  const response = UrlFetchApp.fetch(apiUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
  return JSON.parse(response.getContentText());
}

/**
 * Extrai entidades nomeadas do resultado do BERT
 * @param {Object} resultado - Resultado da API
 * @return {Array} Lista de entidades encontradas
 */
function extrairEntidades(resultado) {
  // Filtra apenas entidades do tipo PESSOA, LOCAL e ORGANIZAÇÃO
  return resultado.entities.filter(e => ['PER', 'LOC', 'ORG'].includes(e.type));
}
