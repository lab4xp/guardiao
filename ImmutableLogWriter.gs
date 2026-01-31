/**
 * @fileoverview ImmutableLogWriter - Subsistema de Logs Imutáveis
 * Implementa persistência de segurança (append-only) para eventos do sistema.
 */

const ImmutableLogWriter = {
  
  /**
   * Grava log de atividade do sistema
   */
  write: function(level, component, message) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      nivel: level,
      modulo: component,
      mensagem: message,
      contexto: Session.getActiveUser().getEmail()
    };
    
    // Logs de sistema vão para a aba 'LogsProcessamento'
    try {
      const sheet = SheetsConnector.getSheet('logs');
      sheet.appendRow([
        logEntry.timestamp,
        logEntry.nivel,
        logEntry.modulo,
        logEntry.mensagem,
        logEntry.contexto
      ]);
    } catch (e) {
      // Fallback em caso de erro na planilha: grava no Logger do Apps Script
      Logger.log(`[${level}] ${component}: ${message}`);
    }
  }
};

// Singleton Logger para o sistema usar em todos os módulos
const SystemLogger = {
  info:  (comp, msg) => ImmutableLogWriter.write('INFO', comp, msg),
  warn:  (comp, msg) => ImmutableLogWriter.write('WARN', comp, msg),
  error: (comp, msg) => ImmutableLogWriter.write('ERROR', comp, msg)
};
