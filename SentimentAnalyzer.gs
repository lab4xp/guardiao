// Análise de sentimento para denúncias

/**
 * Analisa sentimento de uma denúncia
 * @param {string} texto - Texto da denúncia
 * @return {Object} Análise de sentimento
 */
function analisarSentimento(texto) {
  // Palavras positivas e negativas (simplificado)
  const palavrasNegativas = ['grave', 'urgente', 'crítico', 'problema', 'erro'];
  const palavrasPositivas = ['resolvido', 'melhorou', 'satisfeito'];
  // Conta ocorrências
  let scoreNegativo = 0;
  let scorePositivo = 0;
  palavrasNegativas.forEach(palavra => {
    if (texto.toLowerCase().includes(palavra)) scoreNegativo++;
  });
  palavrasPositivas.forEach(palavra => {
    if (texto.toLowerCase().includes(palavra)) scorePositivo++;
  });
  // Classifica sentimento
  const sentimento = scoreNegativo > scorePositivo ? 'NEGATIVO' : 
                     scorePositivo > scoreNegativo ? 'POSITIVO' : 'NEUTRO';
  return {
    sentimento: sentimento,
    scoreNegativo: scoreNegativo,
    scorePositivo: scorePositivo
  };
}
