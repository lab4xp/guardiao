// Modelo de dados para usuários

/**
 * Cria novo usuário
 * @param {Object} dadosUsuario - Dados do usuário
 * @return {string} ID do usuário criado
 */
function criarUsuario(dadosUsuario) {
  // Gera ID único
  const id = 'USR-' + new Date().getTime();
  // Hash da senha
  const senhaHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, dadosUsuario.senha);
  const senhaHashStr = Utilities.base64Encode(senhaHash);
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
  sheet.appendRow([
    dadosUsuario.email,
    senhaHashStr,
    dadosUsuario.nome,
    dadosUsuario.perfil,
    'ATIVO'
  ]);
  return id;
}

/**
 * Busca usuário por email
 * @param {string} email - Email do usuário
 * @return {Object} Dados do usuário
 */
function buscarUsuarioPorEmail(email) {
  // Busca na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === email);
}
