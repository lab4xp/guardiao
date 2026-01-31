// Atualizações em lote para otimização de quota

/**
 * Atualiza múltiplas células de uma vez para economizar quota
 * @param {string} sheetName - Nome da planilha
 * @param {Array} updates - Array de atualizações [linha, coluna, valor]
 */
function atualizarEmLote(sheetName, updates) {
  // Acessa a planilha especificada
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Agrupa atualizações para executar em uma única operação
  updates.forEach(update => {
    sheet.getRange(update[0], update[1]).setValue(update[2]);
  });
  // Força flush para garantir que mudanças sejam salvas
  SpreadsheetApp.flush();
}

/**
 * Atualiza status de múltiplos registros
 * @param {Array} ids - IDs dos registros
 * @param {string} novoStatus - Novo status
 */
function atualizarStatusEmLote(ids, novoStatus) {
  // Prepara array de atualizações
  const updates = ids.map((id, index) => [index + 2, 4, novoStatus]);
  // Executa atualização em lote
  atualizarEmLote('Documentos', updates);
}
