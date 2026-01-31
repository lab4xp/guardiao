// Avaliação de riscos de privacidade

/**
 * Avalia riscos de um tratamento de dados
 * @param {Object} tratamento - Dados do tratamento
 * @return {Object} Avaliação de riscos
 */
function avaliarRiscos(tratamento) {
  // Calcula score de risco baseado em fatores
  let scoreRisco = 0;
  // Aumenta risco se envolve dados sensíveis
  if (tratamento.dadosSensiveis) scoreRisco += 40;
  // Aumenta se envolve grande volume
  if (tratamento.volumeDados > 1000) scoreRisco += 30;
  // Aumenta se compartilha com terceiros
  if (tratamento.compartilhaTerceiros) scoreRisco += 30;
  // Classifica nível de risco
  const nivel = scoreRisco >= 70 ? 'ALTO' : scoreRisco >= 40 ? 'MEDIO' : 'BAIXO';
  return {
    scoreRisco: scoreRisco,
    nivelRisco: nivel,
    requerRipd: scoreRisco >= 70
  };
}

/**
 * Salva avaliação de risco na planilha
 * @param {string} tratamentoId - ID do tratamento
 * @param {Object} avaliacao - Avaliação de risco
 */
function salvarAvaliacaoRisco(tratamentoId, avaliacao) {
  // Registra na planilha de avaliações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('AvaliacoesRisco');
  sheet.appendRow([
    tratamentoId,
    new Date(),
    avaliacao.scoreRisco,
    avaliacao.nivelRisco,
    avaliacao.requerRipd ? 'SIM' : 'NAO'
  ]);
}
