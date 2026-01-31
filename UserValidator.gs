// Validação de credenciais de usuário

/**
 * Valida credenciais de usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @return {boolean} True se credenciais válidas
 */
function validarCredenciais(email, senha) {
  // Busca usuário na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Usuarios');
  const dados = sheet.getDataRange().getValues();
  const usuario = dados.find(row => row[0] === email);
  // Verifica se usuário existe e senha está correta
  if (!usuario) return false;
  // Compara hash da senha
  const senhaHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, senha);
  const senhaHashStr = Utilities.base64Encode(senhaHash);
  return usuario[1] === senhaHashStr;
}

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @return {boolean} True se válido
 */
function validarFormatoEmailUsuario(email) {
  // Regex para validação de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
