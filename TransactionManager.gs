// Gerenciamento de transações com LockService

/**
 * Executa operação com lock (transação)
 * @param {Function} operacao - Operação a executar
 * @param {string} chave - Chave do lock
 */
function executarComLock(operacao, chave) {
  // Obtém lock do script
  const lock = LockService.getScriptLock();
  try {
    // Aguarda até 30 segundos pelo lock
    lock.waitLock(30000);
    // Executa operação
    operacao();
  } catch (erro) {
    logError('Erro ao executar com lock', { erro: erro.message, chave });
    throw erro;
  } finally {
    // Libera lock
    lock.releaseLock();
  }
}

/**
 * Executa operação com lock de documento
 * @param {Function} operacao - Operação a executar
 * @param {string} docId - ID do documento
 */
function executarComLockDocumento(operacao, docId) {
  // Obtém lock específico do documento
  const lock = LockService.getDocumentLock();
  try {
    lock.waitLock(30000);
    operacao();
  } finally {
    lock.releaseLock();
  }
}
