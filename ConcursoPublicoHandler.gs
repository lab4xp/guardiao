// Tratamento de concursos públicos

/**
 * Registra novo concurso público na planilha
 * @param {Object} dadosConcurso - Dados do concurso
 */
function registrarConcursoPublico(dadosConcurso) {
  // Acessa planilha de concursos públicos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConcursosPublicos');
  // Adiciona novo registro com dados do concurso
  sheet.appendRow([
    dadosConcurso.id,
    dadosConcurso.nome,
    dadosConcurso.dataPublicacao,
    dadosConcurso.orgao,
    'ATIVO'
  ]);
}

/**
 * Busca concursos públicos por órgão
 * @param {string} orgao - Nome do órgão
 * @return {Array} Lista de concursos
 */
function buscarConcursosPorOrgao(orgao) {
  // Acessa planilha de concursos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ConcursosPublicos');
  // Filtra concursos pelo órgão
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[3] === orgao);
}
