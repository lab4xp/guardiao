// Aplicação do princípio de minimização de dados

/**
 * Remove campos desnecessários de um registro
 * @param {Object} registro - Registro completo
 * @param {Array} camposNecessarios - Lista de campos necessários
 * @return {Object} Registro minimizado
 */
function minimizarDados(registro, camposNecessarios) {
  // Cria novo objeto apenas com campos necessários
  const registroMinimizado = {};
  camposNecessarios.forEach(campo => {
    if (registro[campo]) {
      registroMinimizado[campo] = registro[campo];
    }
  });
  return registroMinimizado;
}

/**
 * Aplica minimização em lote na planilha
 * @param {string} sheetName - Nome da planilha
 * @param {Array} colunasRemover - Colunas a remover
 */
function aplicarMinimizacaoLote(sheetName, colunasRemover) {
  // Acessa planilha especificada
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  // Remove colunas desnecessárias
  colunasRemover.sort((a, b) => b - a).forEach(col => {
    sheet.deleteColumn(col);
  });
}
