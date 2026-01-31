// Tratamento de pedidos de informação (LAI)

/**
 * Registra pedido de informação (LAI)
 * @param {Object} pedido - Dados do pedido
 * @return {string} Protocolo gerado
 */
function registrarPedidoInformacao(pedido) {
  // Gera protocolo único
  const protocolo = 'LAI-' + new Date().getTime();
  // Registra na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PedidosLAI');
  sheet.appendRow([
    protocolo,
    new Date(),
    pedido.solicitante,
    pedido.assunto,
    pedido.descricao,
    'EM_ANALISE'
  ]);
  return protocolo;
}

/**
 * Atualiza status de pedido LAI
 * @param {string} protocolo - Protocolo do pedido
 * @param {string} novoStatus - Novo status
 */
function atualizarStatusPedidoLai(protocolo, novoStatus) {
  // Localiza pedido na planilha
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PedidosLAI');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === protocolo) + 1;
  // Atualiza status
  sheet.getRange(linha, 6).setValue(novoStatus);
}
