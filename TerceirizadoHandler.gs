// Tratamento de dados de terceirizados

/**
 * Registra terceirizado
 * @param {Object} dadosTerceirizado - Dados do terceirizado
 * @return {string} ID do registro
 */
function registrarTerceirizado(dadosTerceirizado) {
  // Gera ID único
  const id = 'TERC-' + new Date().getTime();
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Terceirizados');
  sheet.appendRow([
    id,
    dadosTerceirizado.nome,
    dadosTerceirizado.cpf,
    dadosTerceirizado.empresa,
    dadosTerceirizado.dataInicio,
    'ATIVO'
  ]);
  return id;
}

/**
 * Lista terceirizados ativos
 * @return {Array} Lista de terceirizados
 */
function listarTerceirizadosAtivos() {
  // Busca terceirizados com status ATIVO
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Terceirizados');
  const dados = sheet.getDataRange().getValues();
  return dados.filter(row => row[5] === 'ATIVO');
}
