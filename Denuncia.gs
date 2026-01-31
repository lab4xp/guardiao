// Modelo para denúncias da ouvidoria

/**
 * Cria nova denúncia na planilha
 * @param {Object} dadosDenuncia - Dados da denúncia
 * @return {string} ID da denúncia criada
 */
function criarDenuncia(dadosDenuncia) {
  // Gera ID único para a denúncia
  const id = 'DEN-' + new Date().getTime();
  // Acessa planilha de denúncias
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Denuncias');
  // Adiciona denúncia com dados anonimizados
  sheet.appendRow([
    id,
    new Date(),
    dadosDenuncia.tipo,
    dadosDenuncia.descricao,
    'ANONIMO', // Protege identidade do denunciante
    'ABERTA'
  ]);
  return id;
}

/**
 * Atualiza status de uma denúncia
 * @param {string} denunciaId - ID da denúncia
 * @param {string} novoStatus - Novo status
 */
function atualizarStatusDenuncia(denunciaId, novoStatus) {
  // Busca denúncia na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Denuncias');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === denunciaId) + 1;
  // Atualiza status
  sheet.getRange(linha, 6).setValue(novoStatus);
}
