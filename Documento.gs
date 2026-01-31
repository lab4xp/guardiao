// Modelo de dados para documentos processados

/**
 * Cria novo documento na planilha
 * @param {Object} dadosDocumento - Dados do documento
 * @return {string} ID do documento criado
 */
function criarDocumento(dadosDocumento) {
  // Gera ID único para o documento
  const id = 'DOC-' + new Date().getTime();
  // Acessa planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  // Adiciona documento com dados iniciais
  sheet.appendRow([
    id,
    dadosDocumento.titulo,
    new Date(),
    dadosDocumento.tipo,
    'PENDENTE',
    dadosDocumento.origem
  ]);
  return id;
}

/**
 * Busca documento por ID
 * @param {string} docId - ID do documento
 * @return {Object} Dados do documento
 */
function buscarDocumentoPorId(docId) {
  // Busca na planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === docId);
}
