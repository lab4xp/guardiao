// Resolução de ambiguidades semânticas

/**
 * Resolve ambiguidade entre nomes similares
 * @param {string} nome - Nome a verificar
 * @return {Array} Lista de possíveis correspondências
 */
function resolverAmbiguidadeNome(nome) {
  // Busca na planilha de pessoas por nomes similares
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pessoas');
  // Aplica algoritmo de similaridade (Levenshtein simplificado)
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => calcularSimilaridade(row[1], nome) > 0.8);
}
