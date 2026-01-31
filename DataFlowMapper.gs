// Mapeamento de fluxo de dados

/**
 * Mapeia fluxo de dados entre sistemas
 * @param {string} origem - Sistema de origem
 * @param {string} destino - Sistema de destino
 * @param {string} tipoDado - Tipo de dado transferido
 */
function mapearFluxoDados(origem, destino, tipoDado) {
  // Registra fluxo na planilha de mapeamento
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FluxoDados');
  // Adiciona registro com timestamp
  sheet.appendRow([new Date(), origem, destino, tipoDado, 'ATIVO']);
}

/**
 * Lista todos os fluxos de dados ativos
 * @return {Array} Lista de fluxos
 */
function listarFluxosDados() {
  // Busca fluxos na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FluxoDados');
  // Filtra apenas fluxos ativos
  return sheet.getDataRange().getValues().filter(row => row[4] === 'ATIVO');
}
