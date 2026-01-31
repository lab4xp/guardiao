// Validação de integridade de documentos

/**
 * Valida integridade de um documento
 * @param {string} docId - ID do documento
 * @return {Object} Resultado da validação
 */
function validarDocumento(docId) {
  // Busca documento na planilha
  const doc = buscarDocumentoPorId(docId);
  // Verifica campos obrigatórios
  const erros = [];
  if (!doc[1]) erros.push('Título ausente');
  if (!doc[3]) erros.push('Tipo ausente');
  if (!doc[5]) erros.push('Origem ausente');
  // Retorna resultado
  return {
    valido: erros.length === 0,
    erros: erros
  };
}

/**
 * Verifica se documento já foi processado
 * @param {string} fileId - ID do arquivo no Drive
 * @return {boolean} True se já processado
 */
function documentoJaProcessado(fileId) {
  // Busca na planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  return dados.some(row => row[5] === fileId && row[4] === 'CONCLUIDO');
}
