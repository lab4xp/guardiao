// Codificação por cores (Magenta/Ciano/Verde)

/**
 * Aplica cor de acordo com o nível de sensibilidade
 * @param {number} linha - Linha da planilha
 * @param {string} nivel - Nível de sensibilidade (ALTO, MEDIO, BAIXO)
 */
function aplicarCodificacaoCor(linha, nivel) {
  // Acessa planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  // Define cor baseada no nível de sensibilidade
  let cor;
  if (nivel === 'ALTO') cor = '#FF00FF'; // Magenta
  else if (nivel === 'MEDIO') cor = '#00FFFF'; // Ciano
  else cor = '#00FF00'; // Verde
  // Aplica cor de fundo na linha
  sheet.getRange(linha, 1, 1, sheet.getLastColumn()).setBackground(cor);
}

/**
 * Remove codificação de cor de uma linha
 * @param {number} linha - Linha da planilha
 */
function removerCodificacaoCor(linha) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  // Remove cor de fundo (volta ao branco)
  sheet.getRange(linha, 1, 1, sheet.getLastColumn()).setBackground('#FFFFFF');
}
