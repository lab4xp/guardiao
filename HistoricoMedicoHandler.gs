// Tratamento de históricos médicos (dados sensíveis)

/**
 * Anonimiza histórico médico
 * @param {Object} historicoMedico - Dados do histórico
 * @return {Object} Histórico anonimizado
 */
function anonimizarHistoricoMedico(historicoMedico) {
  // Anonimiza dados pessoais mantendo dados clínicos
  return {
    pacienteId: anonimizarCpf(historicoMedico.cpf),
    idade: calcularIdade(historicoMedico.dataNascimento),
    diagnostico: historicoMedico.diagnostico, // Mantém para análise
    tratamento: historicoMedico.tratamento,
    dataAtendimento: historicoMedico.dataAtendimento
  };
}

/**
 * Salva histórico anonimizado na planilha
 * @param {Object} historico - Histórico anonimizado
 */
function salvarHistoricoAnonimizado(historico) {
  // Acessa planilha de históricos médicos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HistoricosMedicos');
  // Adiciona registro anonimizado
  sheet.appendRow([
    historico.pacienteId,
    historico.idade,
    historico.diagnostico,
    historico.tratamento,
    historico.dataAtendimento
  ]);
}
