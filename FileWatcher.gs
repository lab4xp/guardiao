// Observador de mudanças em arquivos

/**
 * Monitora mudanças em arquivo específico
 * @param {string} fileId - ID do arquivo
 */
function monitorarMudancasArquivo(fileId) {
  // Obtém arquivo do Drive
  const file = DriveApp.getFileById(fileId);
  // Obtém última modificação registrada
  const ultimaMod = obterUltimaModificacao(fileId);
  // Verifica se houve mudança
  if (file.getLastUpdated() > ultimaMod) {
    processarMudanca(fileId);
    atualizarUltimaModificacao(fileId, file.getLastUpdated());
  }
}

/**
 * Processa mudança detectada em arquivo
 * @param {string} fileId - ID do arquivo
 */
function processarMudanca(fileId) {
  // Registra mudança na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MudancasArquivos');
  sheet.appendRow([new Date(), fileId, 'MODIFICADO']);
}
