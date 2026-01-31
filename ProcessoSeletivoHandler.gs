// Tratamento de processos seletivos de professores

/**
 * Registra inscrição em processo seletivo
 * @param {string} processoId - ID do processo
 * @param {Object} dadosCandidato - Dados do candidato
 * @return {string} ID da inscrição
 */
function registrarInscricaoProcessoSeletivo(processoId, dadosCandidato) {
  // Gera ID de inscrição
  const inscricaoId = 'INS-' + new Date().getTime();
  // Acessa planilha de inscrições
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('InscricoesPS');
  // Adiciona inscrição com dados anonimizados
  sheet.appendRow([
    inscricaoId,
    processoId,
    anonimizarNome(dadosCandidato.nome),
    anonimizarCpf(dadosCandidato.cpf),
    new Date(),
    'CONFIRMADA'
  ]);
  return inscricaoId;
}

/**
 * Lista inscrições de um processo seletivo
 * @param {string} processoId - ID do processo
 * @return {Array} Lista de inscrições
 */
function listarInscricoesProcessoSeletivo(processoId) {
  // Busca inscrições na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('InscricoesPS');
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[1] === processoId);
}
