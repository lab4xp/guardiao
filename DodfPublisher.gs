// Publicador de documentos no DODF

/**
 * Publica documento no DODF
 * @param {string} docId - ID do documento
 * @return {Object} Resultado da publicação
 */
function publicarNoDodf(docId) {
  // Busca documento na planilha
  const doc = buscarDocumentoPorId(docId);
  // Valida antes de publicar
  const validacao = validarConformidadeDodf(doc[2]);
  if (!validacao.conforme) {
    return {
      sucesso: false,
      erro: 'Documento não conforme com LGPD'
    };
  }
  // Registra publicação
  registrarPublicacao(docId, new Date());
  return {
    sucesso: true,
    dataPublicacao: new Date()
  };
}

/**
 * Registra publicação na planilha
 * @param {string} docId - ID do documento
 * @param {Date} dataPublicacao - Data da publicação
 */
function registrarPublicacao(docId, dataPublicacao) {
  // Acessa planilha de publicações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Publicacoes');
  // Adiciona registro
  sheet.appendRow([docId, dataPublicacao, 'DODF', Session.getActiveUser().getEmail()]);
}
