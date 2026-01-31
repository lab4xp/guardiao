// Gerenciamento de backups de dados

/**
 * Cria backup da planilha principal
 * @return {string} ID do arquivo de backup criado
 */
function criarBackup() {
  // Obtém a planilha ativa
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Cria cópia com timestamp no nome
  const backup = ss.copy('Backup_' + Utilities.formatDate(new Date(), 'GMT-3', 'yyyy-MM-dd_HHmmss'));
  // Registra o backup na planilha de controle
  registrarBackup(backup.getId());
  return backup.getId();
}

/**
 * Registra backup criado na planilha de controle
 * @param {string} backupId - ID do arquivo de backup
 */
function registrarBackup(backupId) {
  // Acessa planilha de controle de backups
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Backups');
  // Adiciona registro com ID, data e usuário
  sheet.appendRow([backupId, new Date(), Session.getActiveUser().getEmail()]);
}
