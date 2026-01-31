// Monitoramento de pastas do Google Drive

/**
 * Monitora pasta do Drive por novos arquivos
 * @param {string} folderId - ID da pasta
 */
function monitorarPastaDrive(folderId) {
  // Obtém pasta do Drive
  const folder = DriveApp.getFolderById(folderId);
  // Lista arquivos modificados nas últimas 24h
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const files = folder.searchFiles(`modifiedDate > "${ontem.toISOString()}"`);
  // Processa cada arquivo novo
  while (files.hasNext()) {
    const file = files.next();
    if (!documentoJaProcessado(file.getId())) {
      processarNovoArquivo(file);
    }
  }
}

/**
 * Processa novo arquivo detectado
 * @param {File} file - Arquivo do Drive
 */
function processarNovoArquivo(file) {
  // Cria registro do documento
  const docId = criarDocumento({
    titulo: file.getName(),
    tipo: file.getMimeType(),
    origem: file.getId()
  });
  // Inicia processamento
  processarDocumentoCompleto(docId);
}
