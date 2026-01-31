// Extração de imagens de documentos

/**
 * Extrai imagens de um documento
 * @param {string} docId - ID do documento
 * @return {Array} Lista de imagens extraídas
 */
function extrairImagensDocumento(docId) {
  // Abre documento do Google Docs
  const doc = DocumentApp.openById(docId);
  // Obtém todas as imagens inline
  const body = doc.getBody();
  const imagens = body.getImages();
  // Retorna array de blobs das imagens
  return imagens.map(img => img.getBlob());
}

/**
 * Salva imagens extraídas no Drive
 * @param {Array} imagens - Array de blobs de imagens
 * @param {string} folderId - ID da pasta destino
 */
function salvarImagensNoDrive(imagens, folderId) {
  // Obtém pasta do Drive
  const folder = DriveApp.getFolderById(folderId);
  // Salva cada imagem
  imagens.forEach((img, index) => {
    folder.createFile(img.setName(`imagem_${index + 1}.png`));
  });
}
