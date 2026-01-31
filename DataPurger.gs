// Expurgo de dados conforme política de retenção

/**
 * Executa expurgo de dados expirados
 */
function executarExpurgoDados() {
  // Obtém política de retenção
  const diasRetencao = parseInt(obterConfiguracao('DIAS_RETENCAO'));
  // Calcula data limite
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - diasRetencao);
  // Remove registros expirados
  removerRegistrosExpirados('Documentos', dataLimite);
  // Registra execução do expurgo
  registrarExpurgo(dataLimite);
}

/**
 * Remove registros expirados de uma planilha
 * @param {string} sheetName - Nome da planilha
 * @param {Date} dataLimite - Data limite
 */
function removerRegistrosExpirados(sheetName, dataLimite) {
  // Acessa planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const dados = sheet.getDataRange().getValues();
  // Remove linhas expiradas (de trás para frente)
  for (let i = dados.length - 1; i >= 1; i--) {
    if (new Date(dados[i][2]) < dataLimite) {
      sheet.deleteRow(i + 1);
    }
  }
}
