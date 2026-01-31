// Envio de relatórios periódicos

/**
 * Envia relatório periódico por email
 * @param {string} tipoRelatorio - Tipo do relatório
 * @param {Array} destinatarios - Lista de emails
 */
function enviarRelatorioPeriodico(tipoRelatorio, destinatarios) {
  // Gera relatório baseado no tipo
  let relatorio;
  if (tipoRelatorio === 'COMPLIANCE') {
    relatorio = gerarRelatorioCompliance(new Date(), new Date());
  } else if (tipoRelatorio === 'MPDFT') {
    relatorio = gerarRelatorioMpdft(new Date(), new Date());
  }
  // Formata relatório como texto
  const corpo = formatarRelatorio(relatorio);
  // Envia para cada destinatário
  destinatarios.forEach(email => {
    MailApp.sendEmail(email, `Relatório ${tipoRelatorio}`, corpo);
  });
}

/**
 * Formata relatório para email
 * @param {Object} relatorio - Relatório a formatar
 * @return {string} Relatório formatado
 */
function formatarRelatorio(relatorio) {
  // Formata como texto simples
  return JSON.stringify(relatorio, null, 2);
}
