// Envio de e-mails de notificação

/**
 * Envia email de notificação
 * @param {string} destinatario - Email do destinatário
 * @param {string} assunto - Assunto do email
 * @param {string} mensagem - Corpo da mensagem
 */
function enviarNotificacao(destinatario, assunto, mensagem) {
  // Valida email do destinatário
  if (!validarEmailRfc(destinatario)) {
    throw new Error('Email inválido: ' + destinatario);
  }
  // Envia email usando MailApp
  MailApp.sendEmail(destinatario, assunto, mensagem);
  // Registra envio na planilha
  registrarEnvioEmail(destinatario, assunto);
}

/**
 * Registra envio de email na planilha
 * @param {string} destinatario - Email do destinatário
 * @param {string} assunto - Assunto do email
 */
function registrarEnvioEmail(destinatario, assunto) {
  // Acessa planilha de log de emails
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogEmails');
  // Adiciona registro com timestamp
  sheet.appendRow([new Date(), destinatario, assunto, 'ENVIADO']);
}
