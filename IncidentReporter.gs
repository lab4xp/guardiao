// Relatório de incidentes de segurança

/**
 * Registra incidente de segurança
 * @param {Object} dadosIncidente - Dados do incidente
 * @return {string} ID do incidente
 */
function registrarIncidente(dadosIncidente) {
  // Gera ID único
  const id = 'INC-' + new Date().getTime();
  // Acessa planilha de incidentes
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Incidentes');
  // Registra incidente
  sheet.appendRow([
    id,
    new Date(),
    dadosIncidente.tipo,
    dadosIncidente.gravidade,
    dadosIncidente.descricao,
    'ABERTO'
  ]);
  // Notifica DPO se gravidade alta
  if (dadosIncidente.gravidade === 'ALTA') {
    notificarDpo(id, dadosIncidente);
  }
  return id;
}

/**
 * Notifica DPO sobre incidente
 * @param {string} incidenteId - ID do incidente
 * @param {Object} dados - Dados do incidente
 */
function notificarDpo(incidenteId, dados) {
  // Obtém email do DPO das configurações
  const emailDpo = obterConfiguracao('EMAIL_DPO');
  // Envia notificação
  enviarNotificacao(
    emailDpo,
    'Incidente de Segurança - ' + incidenteId,
    `Incidente de gravidade ${dados.gravidade} registrado.\n\n${dados.descricao}`
  );
}
