// Classificação de nível de risco de dados

/**
 * Classifica nível de risco de um dado
 * @param {string} tipoDado - Tipo do dado
 * @param {string} contexto - Contexto do uso
 * @return {string} Nível de risco (ALTO, MEDIO, BAIXO)
 */
function classificarNivelRisco(tipoDado, contexto) {
  // Define dados de alto risco
  const altosRisco = ['saude', 'biometrico', 'racial', 'politico', 'religioso', 'sexual'];
  if (altosRisco.includes(tipoDado)) {
    return 'ALTO';
  }
  // Define dados de médio risco
  const medioRisco = ['cpf', 'rg', 'endereco', 'telefone'];
  if (medioRisco.includes(tipoDado)) {
    return 'MEDIO';
  }
  // Padrão: baixo risco
  return 'BAIXO';
}

/**
 * Calcula score numérico de risco
 * @param {string} nivelRisco - Nível de risco
 * @return {number} Score (0-100)
 */
function calcularScoreRisco(nivelRisco) {
  // Converte nível para score numérico
  const scores = {
    'ALTO': 80,
    'MEDIO': 50,
    'BAIXO': 20
  };
  return scores[nivelRisco] || 0;
}
