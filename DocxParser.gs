// Parser de documentos DOCX

/**
 * Extrai texto de arquivo DOCX
 * @param {string} fileId - ID do arquivo no Drive
 * @return {string} Texto extraído
 */
function extrairTextoDocx(fileId) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Converte DOCX para Google Docs temporariamente
  const docTemp = Drive.Files.copy({}, fileId, {
    convert: true
  });
  // Extrai texto do Google Docs
  const doc = DocumentApp.openById(docTemp.id);
  const texto = doc.getBody().getText();
  // Remove documento temporário
  DriveApp.getFileById(docTemp.id).setTrashed(true);
  return texto;
}

/**
 * Extrai metadados de arquivo DOCX
 * @param {string} fileId - ID do arquivo
 * @return {Object} Metadados extraídos
 */
function extrairMetadadosDocx(fileId) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Retorna metadados básicos
  return {
    nome: file.getName(),
    tamanho: file.getSize(),
    dataCriacao: file.getDateCreated(),
    dataModificacao: file.getLastUpdated()
  };
}
