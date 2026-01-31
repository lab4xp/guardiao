// Processamento de editais para publicação

/**
 * Processa edital antes da publicação
 * @param {string} editalId - ID do edital
 */
function processarEdital(editalId) {
  // Busca edital na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Editais');
  const dados = sheet.getDataRange().getValues();
  const edital = dados.find(row => row[0] === editalId);
  // Valida conformidade LGPD
  const validacao = validarConformidadeDodf(edital[2]); // texto do edital
  // Se não conforme, marca para revisão
  if (!validacao.conforme) {
    marcarParaRevisao(editalId, validacao.problemas);
  } else {
    aprovarParaPublicacao(editalId);
  }
}

/**
 * Marca edital para revisão
 * @param {string} editalId - ID do edital
 * @param {Array} problemas - Problemas encontrados
 */
function marcarParaRevisao(editalId, problemas) {
  // Atualiza status na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Editais');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === editalId) + 1;
  sheet.getRange(linha, 4).setValue('REVISAO');
  sheet.getRange(linha, 5).setValue(problemas.join(', '));
}
