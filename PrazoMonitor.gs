// Monitoramento de prazos LAI

/**
 * Monitora prazos de pedidos LAI
 */
function monitorarPrazosLai() {
  // Busca pedidos em andamento
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PedidosLAI');
  const dados = sheet.getDataRange().getValues();
  const hoje = new Date();
  // Verifica prazos
  dados.forEach((row, index) => {
    if (row[5] === 'EM_ANALISE') {
      const dataRegistro = new Date(row[1]);
      const diasDecorridos = Math.floor((hoje - dataRegistro) / (1000 * 60 * 60 * 24));
      // Prazo LAI é 20 dias
      if (diasDecorridos >= 18) {
        alertarPrazoProximo(row[0], 20 - diasDecorridos);
      }
    }
  });
}

/**
 * Alerta sobre prazo próximo do vencimento
 * @param {string} protocolo - Protocolo do pedido
 * @param {number} diasRestantes - Dias restantes
 */
function alertarPrazoProximo(protocolo, diasRestantes) {
  // Cria alerta
  criarAlerta('AVISO', `Prazo LAI ${protocolo} vence em ${diasRestantes} dias`);
}
