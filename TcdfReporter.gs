// Geração de relatórios para TCDF

/**
 * Gera relatório para o Tribunal de Contas do DF
 * @param {Date} dataInicio - Data inicial
 * @param {Date} dataFim - Data final
 * @return {Object} Relatório gerado
 */
function gerarRelatorioTcdf(dataInicio, dataFim) {
  // Busca dados do período
  const logs = buscarLogsPorPeriodo(dataInicio, dataFim);
  // Agrupa por tipo de operação
  const porOperacao = {};
  logs.forEach(log => {
    const operacao = log[2];
    porOperacao[operacao] = (porOperacao[operacao] || 0) + 1;
  });
  // Cria relatório
  const relatorio = {
    periodo: { inicio: dataInicio, fim: dataFim },
    totalOperacoes: logs.length,
    porOperacao: porOperacao,
    geradoEm: new Date()
  };
  // Salva relatório
  salvarRelatorioTcdf(relatorio);
  return relatorio;
}

/**
 * Salva relatório na planilha
 * @param {Object} relatorio - Relatório a salvar
 */
function salvarRelatorioTcdf(relatorio) {
  // Acessa planilha de relatórios TCDF
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RelatoriosTCDF');
  // Adiciona registro
  sheet.appendRow([
    relatorio.geradoEm,
    relatorio.periodo.inicio,
    relatorio.periodo.fim,
    relatorio.totalOperacoes,
    JSON.stringify(relatorio.porOperacao)
  ]);
}
