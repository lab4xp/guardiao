// Modelo de dados para configurações do sistema

/**
 * Cria objeto de configuração padrão
 * @return {Object} Configuração padrão
 */
function criarConfiguracaoPadrao() {
  // Define configurações padrão do sistema
  return {
    nomeAplicacao: 'Guardião SEDF',
    versao: '1.0.0',
    nivelSensibilidadePadrao: 'MEDIO',
    habilitarAuditoria: true,
    tempoRetencaoDias: 365
  };
}

/**
 * Salva configuração na planilha
 * @param {Object} config - Objeto de configuração
 */
function salvarConfiguracao(config) {
  // Acessa planilha de configurações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Configuracoes');
  // Salva cada propriedade como linha na planilha
  Object.keys(config).forEach(chave => {
    const dados = sheet.getDataRange().getValues();
    const linha = dados.findIndex(row => row[0] === chave);
    if (linha >= 0) {
      sheet.getRange(linha + 1, 2).setValue(config[chave]);
    } else {
      sheet.appendRow([chave, config[chave]]);
    }
  });
}
