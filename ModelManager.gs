// Gerenciamento de modelos de IA

/**
 * Carrega modelo de IA configurado
 * @param {string} nomeModelo - Nome do modelo
 * @return {Object} Configuração do modelo
 */
function carregarModelo(nomeModelo) {
  // Busca configuração do modelo na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ModelosIA');
  const dados = sheet.getDataRange().getValues();
  const modelo = dados.find(row => row[0] === nomeModelo);
  // Retorna configuração
  return {
    nome: modelo[0],
    url: modelo[1],
    versao: modelo[2],
    ativo: modelo[3] === 'SIM'
  };
}

/**
 * Atualiza versão do modelo
 * @param {string} nomeModelo - Nome do modelo
 * @param {string} novaVersao - Nova versão
 */
function atualizarVersaoModelo(nomeModelo, novaVersao) {
  // Localiza modelo na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ModelosIA');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === nomeModelo) + 1;
  // Atualiza versão
  sheet.getRange(linha, 3).setValue(novaVersao);
}
