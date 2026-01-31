// Classificação de dados públicos vs privados

/**
 * Classifica dado como público ou privado
 * @param {string} tipoDado - Tipo do dado
 * @param {string} contexto - Contexto do dado
 * @return {string} Classificação (PUBLICO, PRIVADO, SENSIVEL)
 */
function classificarDado(tipoDado, contexto) {
  // Define dados sempre públicos
  const dadosPublicos = ['cargo', 'salario_servidor_publico', 'orgao'];
  if (dadosPublicos.includes(tipoDado)) {
    return 'PUBLICO';
  }
  // Define dados sempre sensíveis
  const dadosSensiveis = ['saude', 'racial', 'politico', 'religioso'];
  if (dadosSensiveis.includes(tipoDado)) {
    return 'SENSIVEL';
  }
  // Analisa contexto para outros dados
  if (contexto.includes('publicado') || contexto.includes('divulgado')) {
    return 'PUBLICO';
  }
  // Padrão: privado
  return 'PRIVADO';
}

/**
 * Verifica se dado pode ser publicado
 * @param {string} classificacao - Classificação do dado
 * @return {boolean} True se pode ser publicado
 */
function podeSerPublicado(classificacao) {
  // Apenas dados públicos podem ser publicados sem consentimento
  return classificacao === 'PUBLICO';
}
