// Verificação de permissões e ACL

/**
 * Verifica se usuário tem permissão específica
 * @param {string} email - Email do usuário
 * @param {string} permissao - Permissão a verificar
 * @return {boolean} True se tem permissão
 */
function verificarPermissaoEspecifica(email, permissao) {
  // Busca permissões do usuário na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Permissoes');
  const dados = sheet.getDataRange().getValues();
  // Verifica se usuário tem a permissão
  return dados.some(row => row[0] === email && row[1] === permissao && row[2] === 'ATIVA');
}

/**
 * Lista todas as permissões de um usuário
 * @param {string} email - Email do usuário
 * @return {Array} Lista de permissões
 */
function listarPermissoesUsuario(email) {
  // Busca permissões na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Permissoes');
  const dados = sheet.getDataRange().getValues();
  // Filtra permissões do usuário
  return dados.filter(row => row[0] === email && row[2] === 'ATIVA').map(row => row[1]);
}
