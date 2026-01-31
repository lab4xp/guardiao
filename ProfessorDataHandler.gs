// Tratamento de dados de professores

/**
 * Busca dados de professor por matrícula
 * @param {string} matricula - Matrícula do professor
 * @return {Object} Dados do professor
 */
function buscarProfessorPorMatricula(matricula) {
  // Acessa planilha de professores
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Professores');
  // Busca professor pela matrícula
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === matricula);
}

/**
 * Atualiza dados de um professor
 * @param {string} matricula - Matrícula do professor
 * @param {Object} novosDados - Novos dados
 */
function atualizarDadosProfessor(matricula, novosDados) {
  // Localiza professor na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Professores');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === matricula) + 1;
  // Atualiza dados
  sheet.getRange(linha, 1, 1, Object.keys(novosDados).length).setValues([Object.values(novosDados)]);
}
