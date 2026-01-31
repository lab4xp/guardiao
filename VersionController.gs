// Controle de versões de documentos

/**
 * Cria nova versão de documento
 * @param {string} docId - ID do documento
 * @param {string} conteudo - Conteúdo da nova versão
 * @return {number} Número da versão criada
 */
function criarVersaoDocumento(docId, conteudo) {
  // Busca última versão
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VersoesDocumentos');
  const dados = sheet.getDataRange().getValues();
  const versoes = dados.filter(row => row[0] === docId);
  const numeroVersao = versoes.length + 1;
  // Cria nova versão
  sheet.appendRow([
    docId,
    numeroVersao,
    new Date(),
    conteudo,
    Session.getActiveUser().getEmail()
  ]);
  return numeroVersao;
}

/**
 * Recupera versão específica de documento
 * @param {string} docId - ID do documento
 * @param {number} numeroVersao - Número da versão
 * @return {Object} Dados da versão
 */
function recuperarVersaoDocumento(docId, numeroVersao) {
  // Busca versão na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VersoesDocumentos');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === docId && row[1] === numeroVersao);
}
