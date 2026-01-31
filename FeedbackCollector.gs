// Coleta de feedback para Active Learning

/**
 * Coleta feedback do usuário sobre detecção
 * @param {string} docId - ID do documento
 * @param {string} entidadeId - ID da entidade
 * @param {boolean} correto - Se a detecção está correta
 */
function coletarFeedback(docId, entidadeId, correto) {
  // Acessa planilha de feedback
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Feedback');
  // Registra feedback com timestamp
  sheet.appendRow([
    new Date(),
    docId,
    entidadeId,
    correto ? 'CORRETO' : 'INCORRETO',
    Session.getActiveUser().getEmail()
  ]);
}

/**
 * Analisa feedback coletado para melhorias
 * @return {Object} Estatísticas de feedback
 */
function analisarFeedback() {
  // Busca feedback na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Feedback');
  const dados = sheet.getDataRange().getValues();
  // Calcula estatísticas
  const total = dados.length;
  const corretos = dados.filter(row => row[3] === 'CORRETO').length;
  return {
    total: total,
    corretos: corretos,
    acuracia: (corretos / total * 100).toFixed(2) + '%'
  };
}
