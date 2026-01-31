// Tratamento de recursos LAI

/**
 * Registra recurso de pedido LAI
 * @param {string} protocoloOriginal - Protocolo do pedido original
 * @param {Object} dadosRecurso - Dados do recurso
 * @return {string} Protocolo do recurso
 */
function registrarRecursoLai(protocoloOriginal, dadosRecurso) {
  // Gera protocolo do recurso
  const protocoloRecurso = 'REC-' + protocoloOriginal;
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecursosLAI');
  sheet.appendRow([
    protocoloRecurso,
    protocoloOriginal,
    new Date(),
    dadosRecurso.justificativa,
    'EM_ANALISE'
  ]);
  return protocoloRecurso;
}

/**
 * Atualiza status de recurso
 * @param {string} protocoloRecurso - Protocolo do recurso
 * @param {string} novoStatus - Novo status
 */
function atualizarStatusRecurso(protocoloRecurso, novoStatus) {
  // Localiza recurso na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecursosLAI');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === protocoloRecurso) + 1;
  // Atualiza status
  sheet.getRange(linha, 5).setValue(novoStatus);
}
