// Envio de alertas críticos por e-mail

/**
 * Envia alerta por email para usuários específicos
 * @param {Array} destinatarios - Lista de emails
 * @param {string} assunto - Assunto do email
 * @param {string} corpo - Corpo da mensagem
 */
function enviarAlertaEmail(destinatarios, assunto, corpo) {
  // Itera sobre a lista de destinatários
  destinatarios.forEach(email => {
    // Envia email usando o serviço do Google Apps Script
    MailApp.sendEmail(email, assunto, corpo);
  });
  // Registra o envio na planilha de logs
  registrarEnvioAlerta(destinatarios.length, assunto);
}
