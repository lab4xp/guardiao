// Anonimização de listas de classificação

/**
 * Anonimiza lista de classificação de concurso
 * @param {Array} lista - Array com dados dos candidatos
 * @return {Array} Lista anonimizada
 */
function anonimizarListaClassificacao(lista) {
  // Itera sobre cada candidato na lista
  return lista.map(candidato => {
    // Substitui nome por iniciais e CPF por hash
    return [
      candidato[0], // Mantém posição
      anonimizarNome(candidato[1]), // Anonimiza nome
      anonimizarCpf(candidato[2]), // Anonimiza CPF
      candidato[3] // Mantém nota
    ];
  });
}

/**
 * Salva lista anonimizada na planilha
 * @param {Array} listaAnonimizada - Lista já anonimizada
 * @param {string} concursoId - ID do concurso
 */
function salvarListaAnonimizada(listaAnonimizada, concursoId) {
  // Acessa planilha de listas anonimizadas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ListasAnonimizadas');
  // Adiciona cabeçalho com ID do concurso
  sheet.appendRow([concursoId, new Date()]);
  // Insere dados anonimizados
  listaAnonimizada.forEach(row => sheet.appendRow(row));
}
