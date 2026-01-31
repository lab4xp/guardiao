// Interface para Encarregado de Dados (DPO)

/**
 * Registra solicitação para o DPO
 * @param {string} tipo - Tipo de solicitação
 * @param {string} descricao - Descrição da solicitação
 */
function registrarSolicitacaoDpo(tipo, descricao) {
  // Acessa planilha de solicitações DPO
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SolicitacoesDPO');
  // Adiciona nova solicitação com status PENDENTE
  sheet.appendRow([
    new Date(),
    tipo,
    descricao,
    Session.getActiveUser().getEmail(),
    'PENDENTE'
  ]);
}

/**
 * Lista solicitações pendentes do DPO
 * @return {Array} Lista de solicitações pendentes
 */
function listarSolicitacoesPendentes() {
  // Busca solicitações na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SolicitacoesDPO');
  // Filtra apenas pendentes
  return sheet.getDataRange().getValues().filter(row => row[4] === 'PENDENTE');
}
