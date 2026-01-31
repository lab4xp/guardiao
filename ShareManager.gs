// Gerenciamento de compartilhamento de arquivos

/**
 * Compartilha arquivo com usuário
 * @param {string} fileId - ID do arquivo
 * @param {string} email - Email do usuário
 * @param {string} permissao - Tipo de permissão (VIEW, EDIT)
 */
function compartilharArquivo(fileId, email, permissao) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Adiciona permissão
  if (permissao === 'VIEW') {
    file.addViewer(email);
  } else if (permissao === 'EDIT') {
    file.addEditor(email);
  }
  // Registra compartilhamento
  logInfo('Arquivo compartilhado', { fileId, email, permissao });
}

/**
 * Remove compartilhamento de arquivo
 * @param {string} fileId - ID do arquivo
 * @param {string} email - Email do usuário
 */
function removerCompartilhamento(fileId, email) {
  // Obtém arquivo
  const file = DriveApp.getFileById(fileId);
  // Remove permissões
  file.removeViewer(email);
  file.removeEditor(email);
  // Registra remoção
  logInfo('Compartilhamento removido', { fileId, email });
}
