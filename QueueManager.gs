// Gerenciamento de fila de processamento

/**
 * Adiciona documento à fila de processamento
 * @param {string} docId - ID do documento
 * @param {number} prioridade - Prioridade (0-100)
 */
function adicionarAFila(docId, prioridade) {
  // Acessa planilha de fila
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FilaProcessamento');
  // Adiciona à fila com timestamp
  sheet.appendRow([
    docId,
    prioridade,
    new Date(),
    'AGUARDANDO'
  ]);
}

/**
 * Obtém próximo documento da fila
 * @return {Object} Próximo documento ou null
 */
function obterProximoDaFila() {
  // Busca fila ordenada por prioridade
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FilaProcessamento');
  const dados = sheet.getDataRange().getValues();
  // Filtra apenas aguardando e ordena por prioridade
  const aguardando = dados.filter(row => row[3] === 'AGUARDANDO')
    .sort((a, b) => b[1] - a[1]);
  return aguardando.length > 0 ? aguardando[0] : null;
}

/**
 * Remove documento da fila
 * @param {string} docId - ID do documento
 */
function removerDaFila(docId) {
  // Localiza e remove da planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FilaProcessamento');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === docId) + 1;
  if (linha > 0) sheet.deleteRow(linha);
}
