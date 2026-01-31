// Gerenciamento de transparência ativa (LAI)

/**
 * Publica documento para transparência ativa
 * @param {string} docId - ID do documento
 */
function publicarTransparenciaAtiva(docId) {
  // Valida documento para publicação
  const validacao = validarParaPublicacao(docId);
  if (!validacao.aprovado) {
    throw new Error('Documento não aprovado para publicação');
  }
  // Marca como publicado
  atualizarStatusDocumento(docId, 'PUBLICADO_TRANSPARENCIA');
  // Registra publicação
  logInfo('Documento publicado em transparência ativa', { docId });
}

/**
 * Lista documentos publicados em transparência ativa
 * @return {Array} Lista de documentos
 */
function listarDocumentosTransparencia() {
  // Busca documentos com status PUBLICADO_TRANSPARENCIA
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[4] === 'PUBLICADO_TRANSPARENCIA');
}
