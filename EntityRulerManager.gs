// Gerenciamento de regras do EntityRuler

/**
 * Adiciona regra customizada ao EntityRuler
 * @param {string} padrao - Padrão a detectar
 * @param {string} tipo - Tipo de entidade
 */
function adicionarRegraEntityRuler(padrao, tipo) {
  // Acessa planilha de regras
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RegrasEntityRuler');
  // Adiciona nova regra
  sheet.appendRow([padrao, tipo, new Date(), 'ATIVA']);
}

/**
 * Lista todas as regras ativas
 * @return {Array} Lista de regras
 */
function listarRegrasAtivas() {
  // Busca regras na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RegrasEntityRuler');
  // Filtra apenas regras ativas
  return sheet.getDataRange().getValues().filter(row => row[3] === 'ATIVA');
}
