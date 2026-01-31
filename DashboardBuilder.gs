// Construtor de dashboard de monitoramento

/**
 * Gera dados para dashboard de monitoramento
 * @return {Object} Dados do dashboard
 */
function gerarDadosDashboard() {
  // Conta documentos por status
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Documentos');
  const dados = sheet.getDataRange().getValues();
  // Agrupa por status
  const porStatus = {};
  dados.forEach(row => {
    const status = row[4];
    porStatus[status] = (porStatus[status] || 0) + 1;
  });
  return porStatus;
}

/**
 * Atualiza dashboard na planilha
 */
function atualizarDashboard() {
  // Gera dados atualizados
  const dados = gerarDadosDashboard();
  // Atualiza células do dashboard
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dashboard');
  sheet.getRange('B2').setValue(dados.PROCESSADO || 0);
  sheet.getRange('B3').setValue(dados.PENDENTE || 0);
}
