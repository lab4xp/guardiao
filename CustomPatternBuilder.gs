// Construtor de padrões customizados

/**
 * Cria padrão regex customizado
 * @param {string} tipo - Tipo do padrão
 * @param {string} regex - Expressão regular
 */
function criarPadraoCustomizado(tipo, regex) {
  // Acessa planilha de padrões customizados
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PadroesCustomizados');
  // Adiciona novo padrão com timestamp
  sheet.appendRow([tipo, regex, new Date(), Session.getActiveUser().getEmail()]);
}

/**
 * Lista todos os padrões customizados
 * @return {Array} Lista de padrões
 */
function listarPadroesCustomizados() {
  // Busca padrões na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PadroesCustomizados');
  // Retorna todos os registros
  return sheet.getDataRange().getValues();
}
