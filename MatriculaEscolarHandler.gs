// Tratamento de dados de matrícula escolar

/**
 * Registra matrícula escolar
 * @param {Object} dadosMatricula - Dados da matrícula
 * @return {string} ID da matrícula
 */
function registrarMatriculaEscolar(dadosMatricula) {
  // Gera ID único
  const id = 'MAT-' + new Date().getTime();
  // Acessa planilha de matrículas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MatriculasEscolares');
  // Adiciona registro
  sheet.appendRow([
    id,
    dadosMatricula.alunoId,
    dadosMatricula.escolaId,
    dadosMatricula.ano,
    dadosMatricula.turma,
    'ATIVA'
  ]);
  return id;
}

/**
 * Busca matrículas de um aluno
 * @param {string} alunoId - ID do aluno
 * @return {Array} Lista de matrículas
 */
function buscarMatriculasAluno(alunoId) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MatriculasEscolares');
  // Filtra por aluno
  return sheet.getDataRange().getValues().filter(row => row[1] === alunoId);
}
