// Integração com sistema de ouvidoria

/**
 * Envia manifestação para ouvidoria
 * @param {Object} manifestacao - Dados da manifestação
 * @return {string} Protocolo gerado
 */
function enviarManifestacaoOuvidoria(manifestacao) {
  // Gera protocolo único
  const protocolo = 'OUV-' + new Date().getTime();
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ouvidoria');
  sheet.appendRow([
    protocolo,
    new Date(),
    manifestacao.tipo,
    manifestacao.assunto,
    manifestacao.descricao,
    'ABERTA'
  ]);
  return protocolo;
}

/**
 * Consulta status de manifestação
 * @param {string} protocolo - Protocolo da manifestação
 * @return {Object} Status da manifestação
 */
function consultarManifestacao(protocolo) {
  // Busca na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ouvidoria');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === protocolo);
}
