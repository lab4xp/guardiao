// Detecção de dados biométricos

/**
 * Detecta menções a dados biométricos no texto
 * @param {string} texto - Texto para análise
 * @return {Array} Lista de dados biométricos encontrados
 */
function detectarDadosBiometricos(texto) {
  // Define padrões de dados biométricos sensíveis
  const padroes = ['digital', 'impressão digital', 'biometria', 'reconhecimento facial', 'íris', 'retina'];
  // Busca por cada padrão no texto
  return padroes.filter(padrao => texto.toLowerCase().includes(padrao));
}

/**
 * Marca documento com dados biométricos na planilha
 * @param {string} docId - ID do documento
 */
function marcarComoBiometrico(docId) {
  // Acessa planilha de documentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  // Atualiza flag de dados biométricos para SIM
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === docId) + 1;
  sheet.getRange(linha, 6).setValue('BIOMÉTRICO');
}
