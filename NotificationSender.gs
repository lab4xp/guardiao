// Envio de notificações por e-mail

/**
 * Envia notificação por email
 * @param {string} destinatario - Email do destinatário
 * @param {string} tipo - Tipo de notificação
 * @param {string} mensagem - Mensagem
 */
function enviarNotificacaoPorEmail(destinatario, tipo, mensagem) {
  // Define assunto baseado no tipo
  const assuntos = {
    'SUCESSO': 'Operação Concluída',
    'ERRO': 'Erro no Sistema',
    'AVISO': 'Aviso Importante'
  };
  const assunto = assuntos[tipo] || 'Notificação';
  // Envia email
  MailApp.sendEmail(destinatario, assunto, mensagem);
  // Registra envio
  logInfo('Notificação enviada', { destinatario, tipo });
}
