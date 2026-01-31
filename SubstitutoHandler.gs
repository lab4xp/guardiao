// Tratamento de professores substitutos

/**
 * Registra professor substituto
 * @param {Object} dadosSubstituto - Dados do substituto
 * @return {string} ID do registro
 */
function registrarSubstituto(dadosSubstituto) {
  // Gera ID único
  const id = 'SUB-' + new Date().getTime();
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Substitutos');
  sheet.appendRow([
    id,
    dadosSubstituto.nome,
    dadosSubstituto.cpf,
    dadosSubstituto.dataInicio,
    dadosSubstituto.dataFim,
    'ATIVO'
  ]);
  return id;
}

/**
 * Lista substitutos ativos
 * @return {Array} Lista de substitutos
 */
function listarSubstitutosAtivos() {
  // Busca substitutos com status ATIVO
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Substitutos');
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[5] === 'ATIVO');
}
