// Limpeza de metadados de documentos

/**
 * Remove metadados de um arquivo
 * @param {string} fileId - ID do arquivo
 */
function limparMetadados(fileId) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Remove propriedades customizadas
  const props = PropertiesService.getDocumentProperties();
  props.deleteAllProperties();
  // Registra limpeza
  logInfo('Metadados removidos', { fileId: fileId });
}

/**
 * Lista metadados de um arquivo
 * @param {string} fileId - ID do arquivo
 * @return {Object} Metadados do arquivo
 */
function listarMetadados(fileId) {
  // Obtém arquivo
  const file = DriveApp.getFileById(fileId);
  // Retorna metadados básicos
  return {
    nome: file.getName(),
    tipo: file.getMimeType(),
    tamanho: file.getSize(),
    criado: file.getDateCreated(),
    modificado: file.getLastUpdated(),
    proprietario: file.getOwner().getEmail()
  };
}
