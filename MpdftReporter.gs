// Geração de relatórios para MPDFT

/**
 * Gera relatório para o Ministério Público do DF
 * @param {Date} dataInicio - Data inicial
 * @param {Date} dataFim - Data final
 * @return {Object} Relatório gerado
 */
function gerarRelatorioMpdft(dataInicio, dataFim) {
  // Busca dados do período
  const logs = buscarLogsPorPeriodo(dataInicio, dataFim);
  // Agrupa por tipo de dado
  const porTipo = {};
  logs.forEach(log => {
    const tipo = log[2];
    porTipo[tipo] = (porTipo[tipo] || 0) + 1;
  });
  // Cria relatório
  const relatorio = {
    periodo: { inicio: dataInicio, fim: dataFim },
    totalRegistros: logs.length,
    porTipo: porTipo,
    geradoEm: new Date()
  };
  // Salva relatório
  salvarRelatorioMpdft(relatorio);
  return relatorio;
}

/**
 * Salva relatório na planilha
 * @param {Object} relatorio - Relatório a salvar
 */
function salvarRelatorioMpdft(relatorio) {
  // Acessa planilha de relatórios MPDFT
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RelatoriosMPDFT');
  // Adiciona registro
  sheet.appendRow([
    relatorio.geradoEm,
    relatorio.periodo.inicio,
    relatorio.periodo.fim,
    relatorio.totalRegistros,
    JSON.stringify(relatorio.porTipo)
  ]);
}
