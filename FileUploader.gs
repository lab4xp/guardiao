// Upload de arquivos para Drive

/**
 * Faz upload de arquivo para pasta do Drive
 * @param {Blob} arquivo - Arquivo a fazer upload
 * @param {string} folderId - ID da pasta destino
 * @return {string} ID do arquivo criado
 */
function fazerUploadDrive(arquivo, folderId) {
  // Obtém pasta do Drive
  const folder = DriveApp.getFolderById(folderId);
  // Cria arquivo na pasta
  const file = folder.createFile(arquivo);
  // Registra upload na planilha
  registrarUpload(file.getId(), file.getName());
  return file.getId();
}

/**
 * Registra upload na planilha de controle
 * @param {string} fileId - ID do arquivo
 * @param {string} nomeArquivo - Nome do arquivo
 */
function registrarUpload(fileId, nomeArquivo) {
  // Acessa planilha de uploads
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Uploads');
  // Adiciona registro
  sheet.appendRow([
    new Date(),
    fileId,
    nomeArquivo,
    Session.getActiveUser().getEmail()
  ]);
}
