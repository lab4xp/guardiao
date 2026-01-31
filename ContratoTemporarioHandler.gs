// Tratamento de contratos temporários

/**
 * Registra contrato temporário na planilha
 * @param {Object} dadosContrato - Dados do contrato
 */
function registrarContratoTemporario(dadosContrato) {
  // Acessa planilha de contratos temporários
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ContratosTemporarios');
  // Adiciona novo registro com dados do contrato
  sheet.appendRow([
    dadosContrato.id,
    dadosContrato.servidor,
    dadosContrato.dataInicio,
    dadosContrato.dataFim,
    'ATIVO'
  ]);
}

/**
 * Verifica contratos temporários vencidos
 * @return {Array} Lista de contratos vencidos
 */
function verificarContratosVencidos() {
  // Acessa planilha de contratos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ContratosTemporarios');
  // Filtra contratos com data fim anterior à data atual
  const dados = sheet.getDataRange().getValues();
  const hoje = new Date();
  return dados.filter(row => new Date(row[3]) < hoje && row[4] === 'ATIVO');
}
