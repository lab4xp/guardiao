// Tratamento de falsos positivos

/**
 * Registra falso positivo
 * @param {string} texto - Texto marcado incorretamente
 * @param {string} tipoDetectado - Tipo detectado incorretamente
 */
function registrarFalsoPositivo(texto, tipoDetectado) {
  // Acessa planilha de falsos positivos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FalsosPositivos');
  // Adiciona registro
  sheet.appendRow([
    new Date(),
    texto,
    tipoDetectado,
    Session.getActiveUser().getEmail(),
    'PENDENTE'
  ]);
}

/**
 * Adiciona exceção baseada em falso positivo
 * @param {string} texto - Texto a adicionar como exceção
 */
function adicionarExcecao(texto) {
  // Acessa planilha de exceções
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Excecoes');
  // Adiciona texto à lista de exceções
  sheet.appendRow([texto, new Date(), 'ATIVA']);
}
