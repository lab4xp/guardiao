// Modelo para processos seletivos de professores

/**
 * Cria processo seletivo
 * @param {Object} dadosProcesso - Dados do processo seletivo
 * @return {string} ID do processo
 */
function criarProcessoSeletivo(dadosProcesso) {
  // Gera ID único
  const id = 'PS-' + new Date().getTime();
  // Acessa planilha de processos seletivos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ProcessosSeletivos');
  // Adiciona registro
  sheet.appendRow([
    id,
    dadosProcesso.titulo,
    dadosProcesso.dataInicio,
    dadosProcesso.dataFim,
    dadosProcesso.vagas,
    'ABERTO'
  ]);
  return id;
}

/**
 * Busca processo seletivo por ID
 * @param {string} processoId - ID do processo
 * @return {Object} Dados do processo
 */
function buscarProcessoSeletivo(processoId) {
  // Busca na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ProcessosSeletivos');
  const dados = sheet.getDataRange().getValues();
  return dados.find(row => row[0] === processoId);
}
