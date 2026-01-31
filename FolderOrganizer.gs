// Organização automática de pastas

/**
 * Organiza arquivos em pastas por tipo
 * @param {string} folderId - ID da pasta raiz
 */
function organizarPastasPorTipo(folderId) {
  // Obtém pasta do Drive
  const folder = DriveApp.getFolderById(folderId);
  // Lista todos os arquivos
  const files = folder.getFiles();
  // Organiza por tipo MIME
  while (files.hasNext()) {
    const file = files.next();
    const tipo = file.getMimeType();
    // Move para subpasta correspondente
    moverParaSubpasta(file, tipo, folder);
  }
}

/**
 * Move arquivo para subpasta baseada no tipo
 * @param {File} file - Arquivo a mover
 * @param {string} tipo - Tipo MIME
 * @param {Folder} pastaRaiz - Pasta raiz
 */
function moverParaSubpasta(file, tipo, pastaRaiz) {
  // Cria ou obtém subpasta para o tipo
  const nomePasta = tipo.split('/')[0];
  const subpastas = pastaRaiz.getFoldersByName(nomePasta);
  const subpasta = subpastas.hasNext() ? subpastas.next() : pastaRaiz.createFolder(nomePasta);
  // Move arquivo
  file.moveTo(subpasta);
}
