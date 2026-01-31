// Geração de hashes de documentos para auditoria

/**
 * Gera hash SHA-256 de um documento
 * @param {string} conteudo - Conteúdo do documento
 * @return {string} Hash gerado
 */
function gerarHashDocumento(conteudo) {
  // Calcula hash SHA-256
  const hash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    conteudo,
    Utilities.Charset.UTF_8
  );
  // Converte para hexadecimal
  return hash.map(byte => {
    const v = (byte < 0) ? 256 + byte : byte;
    return ('0' + v.toString(16)).slice(-2);
  }).join('');
}

/**
 * Registra hash de documento na planilha
 * @param {string} docId - ID do documento
 * @param {string} hash - Hash gerado
 */
function registrarHashDocumento(docId, hash) {
  // Acessa planilha de hashes
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HashesDocumentos');
  // Adiciona registro com timestamp
  sheet.appendRow([docId, hash, new Date()]);
}
