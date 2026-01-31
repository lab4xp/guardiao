// Processamento automático de novos arquivos

/**
 * Processa automaticamente novos documentos na pasta do Drive
 * @param {string} folderId - ID da pasta do Google Drive
 */
function processarNovosArquivos(folderId) {
  // Obtém a pasta do Drive
  const folder = DriveApp.getFolderById(folderId);
  // Itera sobre arquivos não processados
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    // Processa cada arquivo e marca como processado na planilha
    processarArquivo(file.getId());
  }
}

/**
 * Marca arquivo como processado na planilha de controle
 * @param {string} fileId - ID do arquivo
 */
function marcarComoProcessado(fileId) {
  // Acessa planilha de controle de arquivos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ArquivosProcessados');
  // Adiciona registro com ID, data e status
  sheet.appendRow([fileId, new Date(), 'PROCESSADO']);
}
