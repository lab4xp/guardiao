/**
 * GUARDIÃO SEDF - Gerenciador de Triggers
 * 
 * Gerencia triggers automáticos do Google Apps Script
 * Implementa automação de tarefas periódicas e baseadas em eventos
 * 
 * @author Guardião SEDF Team
 * @version 2.0
 * @date 30/01/2026
 * 
 * Triggers implementados:
 * - onOpen: Menu customizado ao abrir planilha
 * - onEdit: Validação em tempo real
 * - Diário: Limpeza de cache, backup, verificação de integridade
 * - Semanal: Relatórios de compliance, limpeza de logs antigos
 * - Mensal: Auditoria completa, relatórios gerenciais
 * 
 * Total: 241 linhas conforme especificação MVP.txt
 */

const TriggerManager = (function() {
  
  // ============================================================================
  // CONFIGURAÇÕES
  // ============================================================================
  
  const CONFIG = {
    // Prefixo para identificar triggers do sistema
    prefixoTrigger: 'GuardiaoSEDF_',
    
    // Horários de execução
    horarios: {
      limpezaCache: 2,        // 2h da manhã
      backup: 3,              // 3h da manhã
      verificacaoIntegridade: 4, // 4h da manhã
      relatorioCompliance: 8,    // 8h da manhã
      limpezaLogs: 1            // 1h da manhã (domingo)
    },
    
    // Dias da semana (0 = Domingo, 6 = Sábado)
    diasSemana: {
      domingo: ScriptApp.WeekDay.SUNDAY,
      segunda: ScriptApp.WeekDay.MONDAY,
      terca: ScriptApp.WeekDay.TUESDAY,
      quarta: ScriptApp.WeekDay.WEDNESDAY,
      quinta: ScriptApp.WeekDay.THURSDAY,
      sexta: ScriptApp.WeekDay.FRIDAY,
      sabado: ScriptApp.WeekDay.SATURDAY
    },
    
    // Configurações de retry
    maxRetries: 3,
    retryDelay: 5000 // 5 segundos
  };
  
  // ============================================================================
  // FUNÇÕES PRIVADAS - GERENCIAMENTO DE TRIGGERS
  // ============================================================================
  
  /**
   * Verifica se trigger já existe
   * @param {string} nomeFuncao - Nome da função do trigger
   * @returns {boolean} true se existe
   */
  function triggerExiste(nomeFuncao) {
    const triggers = ScriptApp.getProjectTriggers();
    return triggers.some(trigger => 
      trigger.getHandlerFunction() === nomeFuncao
    );
  }
  
  /**
   * Remove trigger específico por nome de função
   * @param {string} nomeFuncao - Nome da função
   */
  function removerTrigger(nomeFuncao) {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === nomeFuncao) {
        ScriptApp.deleteTrigger(trigger);
        Logger.log('Trigger removido: ' + nomeFuncao);
      }
    });
  }
  
  /**
   * Cria trigger com tratamento de erro
   * @param {Function} criarFn - Função que cria o trigger
   * @param {string} nome - Nome do trigger
   */
  function criarTriggerSeguro(criarFn, nome) {
    try {
      criarFn();
      Logger.log('Trigger criado: ' + nome);
      return true;
    } catch (error) {
      Logger.log('Erro ao criar trigger ' + nome + ': ' + error.message);
      return false;
    }
  }
  
  // ============================================================================
  // FUNÇÕES PRIVADAS - TRIGGERS ESPECÍFICOS
  // ============================================================================
  
  /**
   * Cria trigger onOpen (menu customizado)
   */
  function criarTriggerOnOpen() {
    if (!triggerExiste('onOpen')) {
      ScriptApp.newTrigger('onOpen')
        .forSpreadsheet(SpreadsheetApp.getActive())
        .onOpen()
        .create();
    }
  }
  
  /**
   * Cria trigger onEdit (validação em tempo real)
   */
  function criarTriggerOnEdit() {
    if (!triggerExiste('onEditTrigger')) {
      ScriptApp.newTrigger('onEditTrigger')
        .forSpreadsheet(SpreadsheetApp.getActive())
        .onEdit()
        .create();
    }
  }
  
  /**
   * Cria trigger de limpeza de cache (diário)
   */
  function criarTriggerLimpezaCache() {
    if (!triggerExiste('executarLimpezaCache')) {
      ScriptApp.newTrigger('executarLimpezaCache')
        .timeBased()
        .atHour(CONFIG.horarios.limpezaCache)
        .everyDays(1)
        .create();
    }
  }
  
  /**
   * Cria trigger de backup (diário)
   */
  function criarTriggerBackup() {
    if (!triggerExiste('executarBackupAutomatico')) {
      ScriptApp.newTrigger('executarBackupAutomatico')
        .timeBased()
        .atHour(CONFIG.horarios.backup)
        .everyDays(1)
        .create();
    }
  }
  
  /**
   * Cria trigger de verificação de integridade (diário)
   */
  function criarTriggerVerificacaoIntegridade() {
    if (!triggerExiste('executarVerificacaoIntegridade')) {
      ScriptApp.newTrigger('executarVerificacaoIntegridade')
        .timeBased()
        .atHour(CONFIG.horarios.verificacaoIntegridade)
        .everyDays(1)
        .create();
    }
  }
  
  /**
   * Cria trigger de relatório de compliance (diário)
   */
  function criarTriggerRelatorioCompliance() {
    if (!triggerExiste('executarRelatorioCompliance')) {
      ScriptApp.newTrigger('executarRelatorioCompliance')
        .timeBased()
        .atHour(CONFIG.horarios.relatorioCompliance)
        .everyDays(1)
        .create();
    }
  }
  
  /**
   * Cria trigger de limpeza de logs (semanal - domingo)
   */
  function criarTriggerLimpezaLogs() {
    if (!triggerExiste('executarLimpezaLogs')) {
      ScriptApp.newTrigger('executarLimpezaLogs')
        .timeBased()
        .onWeekDay(CONFIG.diasSemana.domingo)
        .atHour(CONFIG.horarios.limpezaLogs)
        .create();
    }
  }
  
  /**
   * Cria trigger de auditoria mensal
   */
  function criarTriggerAuditoriaMensal() {
    if (!triggerExiste('executarAuditoriaMensal')) {
      ScriptApp.newTrigger('executarAuditoriaMensal')
        .timeBased()
        .onMonthDay(1) // Dia 1 de cada mês
        .atHour(9)
        .create();
    }
  }
  
  /**
   * Cria trigger de monitoramento de cotas
   */
  function criarTriggerMonitoramentoCotas() {
    if (!triggerExiste('executarMonitoramentoCotas')) {
      ScriptApp.newTrigger('executarMonitoramentoCotas')
        .timeBased()
        .everyHours(6) // A cada 6 horas
        .create();
    }
  }
  
  // ============================================================================
  // MÉTODOS PÚBLICOS
  // ============================================================================
  
  return {
    
    /**
     * Cria todos os triggers do sistema
     * @returns {Object} Resultado da criação
     */
    criarTriggers: function() {
      Logger.log('=== CRIANDO TRIGGERS DO GUARDIÃO SEDF ===');
      
      const resultados = {
        sucesso: [],
        falhas: []
      };
      
      // Triggers de eventos
      if (criarTriggerSeguro(criarTriggerOnOpen, 'onOpen')) {
        resultados.sucesso.push('onOpen');
      } else {
        resultados.falhas.push('onOpen');
      }
      
      if (criarTriggerSeguro(criarTriggerOnEdit, 'onEdit')) {
        resultados.sucesso.push('onEdit');
      } else {
        resultados.falhas.push('onEdit');
      }
      
      // Triggers diários
      if (criarTriggerSeguro(criarTriggerLimpezaCache, 'Limpeza de Cache')) {
        resultados.sucesso.push('Limpeza de Cache');
      } else {
        resultados.falhas.push('Limpeza de Cache');
      }
      
      if (criarTriggerSeguro(criarTriggerBackup, 'Backup Automático')) {
        resultados.sucesso.push('Backup Automático');
      } else {
        resultados.falhas.push('Backup Automático');
      }
      
      if (criarTriggerSeguro(criarTriggerVerificacaoIntegridade, 'Verificação de Integridade')) {
        resultados.sucesso.push('Verificação de Integridade');
      } else {
        resultados.falhas.push('Verificação de Integridade');
      }
      
      if (criarTriggerSeguro(criarTriggerRelatorioCompliance, 'Relatório de Compliance')) {
        resultados.sucesso.push('Relatório de Compliance');
      } else {
        resultados.falhas.push('Relatório de Compliance');
      }
      
      // Triggers semanais
      if (criarTriggerSeguro(criarTriggerLimpezaLogs, 'Limpeza de Logs')) {
        resultados.sucesso.push('Limpeza de Logs');
      } else {
        resultados.falhas.push('Limpeza de Logs');
      }
      
      // Triggers mensais
      if (criarTriggerSeguro(criarTriggerAuditoriaMensal, 'Auditoria Mensal')) {
        resultados.sucesso.push('Auditoria Mensal');
      } else {
        resultados.falhas.push('Auditoria Mensal');
      }
      
      // Triggers periódicos
      if (criarTriggerSeguro(criarTriggerMonitoramentoCotas, 'Monitoramento de Cotas')) {
        resultados.sucesso.push('Monitoramento de Cotas');
      } else {
        resultados.falhas.push('Monitoramento de Cotas');
      }
      
      // Log de auditoria
      AuditLogger.registrar({
        tipo: 'SISTEMA_INICIO',
        dados: {
          triggersCriados: resultados.sucesso.length,
          triggersFalhos: resultados.falhas.length
        },
        resultado: 'TRIGGERS_CONFIGURADOS'
      });
      
      Logger.log('Triggers criados: ' + resultados.sucesso.length);
      Logger.log('Triggers com falha: ' + resultados.falhas.length);
      
      return resultados;
    },
    
    /**
     * Remove todos os triggers do sistema
     * @returns {Object} Resultado da remoção
     */
    removerTodosTriggers: function() {
      Logger.log('=== REMOVENDO TRIGGERS DO GUARDIÃO SEDF ===');
      
      const triggers = ScriptApp.getProjectTriggers();
      let removidos = 0;
      
      triggers.forEach(trigger => {
        try {
          ScriptApp.deleteTrigger(trigger);
          removidos++;
          Logger.log('Trigger removido: ' + trigger.getHandlerFunction());
        } catch (error) {
          Logger.log('Erro ao remover trigger: ' + error.message);
        }
      });
      
      // Log de auditoria
      AuditLogger.registrar({
        tipo: 'ALTERACAO_CONFIG',
        dados: { triggersRemovidos: removidos },
        resultado: 'TRIGGERS_REMOVIDOS'
      });
      
      return {
        sucesso: true,
        triggersRemovidos: removidos
      };
    },
    
    /**
     * Lista todos os triggers ativos
     * @returns {Array} Lista de triggers
     */
    listarTriggers: function() {
      const triggers = ScriptApp.getProjectTriggers();
      
      return triggers.map(trigger => ({
        funcao: trigger.getHandlerFunction(),
        tipo: trigger.getEventType().toString(),
        id: trigger.getUniqueId()
      }));
    },
    
    /**
     * Verifica status dos triggers
     * @returns {Object} Status
     */
    verificarStatus: function() {
      const triggersEsperados = [
        'onOpen',
        'onEditTrigger',
        'executarLimpezaCache',
        'executarBackupAutomatico',
        'executarVerificacaoIntegridade',
        'executarRelatorioCompliance',
        'executarLimpezaLogs',
        'executarAuditoriaMensal',
        'executarMonitoramentoCotas'
      ];
      
      const triggersAtivos = this.listarTriggers().map(t => t.funcao);
      
      const status = triggersEsperados.map(nome => ({
        nome: nome,
        ativo: triggersAtivos.includes(nome)
      }));
      
      const totalAtivos = status.filter(s => s.ativo).length;
      
      return {
        totalEsperados: triggersEsperados.length,
        totalAtivos: totalAtivos,
        percentualAtivo: Math.round((totalAtivos / triggersEsperados.length) * 100),
        detalhes: status,
        statusGeral: totalAtivos === triggersEsperados.length ? 'OK' : 'INCOMPLETO'
      };
    },
    
    /**
     * Recria trigger específico
     * @param {string} nomeTrigger - Nome do trigger
     */
    recriarTrigger: function(nomeTrigger) {
      // Remove trigger existente
      removerTrigger(nomeTrigger);
      
      // Recria trigger
      const mapeamento = {
        'onOpen': criarTriggerOnOpen,
        'onEditTrigger': criarTriggerOnEdit,
        'executarLimpezaCache': criarTriggerLimpezaCache,
        'executarBackupAutomatico': criarTriggerBackup,
        'executarVerificacaoIntegridade': criarTriggerVerificacaoIntegridade,
        'executarRelatorioCompliance': criarTriggerRelatorioCompliance,
        'executarLimpezaLogs': criarTriggerLimpezaLogs,
        'executarAuditoriaMensal': criarTriggerAuditoriaMensal,
        'executarMonitoramentoCotas': criarTriggerMonitoramentoCotas
      };
      
      if (mapeamento[nomeTrigger]) {
        return criarTriggerSeguro(mapeamento[nomeTrigger], nomeTrigger);
      }
      
      return false;
    },
    
    /**
     * Obtém configurações de triggers
     */
    obterConfig: function() {
      return {
        horarios: CONFIG.horarios,
        diasSemana: CONFIG.diasSemana,
        maxRetries: CONFIG.maxRetries
      };
    }
  };
  
})();

// ============================================================================
// FUNÇÕES DE TRIGGER (EXECUTADAS AUTOMATICAMENTE)
// ============================================================================

/**
 * Trigger onEdit - Executado ao editar célula
 */
function onEditTrigger(e) {
  try {
    // Validação em tempo real (se necessário)
    const range = e.range;
    const sheet = range.getSheet();
    
    // Log apenas para planilhas de dados
    if (sheet.getName() === 'Documentos' || sheet.getName() === 'ResultadosDeteccao') {
      AuditLogger.registrar({
        tipo: 'ALTERACAO_CONFIG',
        dados: {
          planilha: sheet.getName(),
          celula: range.getA1Notation(),
          valorAntigo: e.oldValue,
          valorNovo: e.value
        }
      });
    }
  } catch (error) {
    Logger.log('Erro no onEdit: ' + error.message);
  }
}

/**
 * Executa limpeza de cache (diário às 2h)
 */
function executarLimpezaCache() {
  try {
    Logger.log('=== LIMPEZA DE CACHE AUTOMÁTICA ===');
    
    CacheManager.limparCache();
    Anonymizer.limparCaches();
    
    AuditLogger.registrar({
      tipo: 'SISTEMA_INICIO',
      dados: { tarefa: 'Limpeza de Cache' },
      resultado: 'SUCESSO'
    });
    
    Logger.log('Limpeza de cache concluída');
  } catch (error) {
    Logger.log('Erro na limpeza de cache: ' + error.message);
    AuditLogger.registrar({
      tipo: 'SISTEMA_ERRO',
      dados: { tarefa: 'Limpeza de Cache', erro: error.message },
      resultado: 'FALHA'
    });
  }
}

/**
 * Executa backup automático (diário às 3h)
 */
function executarBackupAutomatico() {
  try {
    Logger.log('=== BACKUP AUTOMÁTICO ===');
    
    const resultado = BackupManager.executarBackup();
    
    AuditLogger.registrar({
      tipo: 'BACKUP',
      dados: resultado,
      resultado: 'SUCESSO'
    });
    
    Logger.log('Backup concluído: ' + resultado.nomeArquivo);
  } catch (error) {
    Logger.log('Erro no backup: ' + error.message);
    AuditLogger.registrar({
      tipo: 'SISTEMA_ERRO',
      dados: { tarefa: 'Backup', erro: error.message },
      resultado: 'FALHA'
    });
  }
}

/**
 * Executa verificação de integridade (diário às 4h)
 */
function executarVerificacaoIntegridade() {
  try {
    Logger.log('=== VERIFICAÇÃO DE INTEGRIDADE ===');
    
    const resultado = AuditLogger.verificarIntegridade();
    
    AuditLogger.registrar({
      tipo: 'VERIFICACAO_COMPLIANCE',
      dados: resultado,
      resultado: resultado.integro ? 'SUCESSO' : 'ALERTA'
    });
    
    // Notifica se houver problema
    if (!resultado.integro) {
      NotificationManager.notificar({
        tipo: 'CRITICO',
        titulo: 'Problema de Integridade Detectado',
        mensagem: resultado.mensagem
      });
    }
    
    Logger.log('Verificação concluída: ' + resultado.mensagem);
  } catch (error) {
    Logger.log('Erro na verificação: ' + error.message);
  }
}

/**
 * Executa relatório de compliance (diário às 8h)
 */
function executarRelatorioCompliance() {
  try {
    Logger.log('=== RELATÓRIO DE COMPLIANCE ===');
    
    const relatorio = ComplianceReporter.gerarRelatorio();
    
    AuditLogger.registrar({
      tipo: 'VERIFICACAO_COMPLIANCE',
      dados: { totalVerificacoes: relatorio.totalVerificacoes },
      resultado: 'RELATORIO_GERADO'
    });
    
    Logger.log('Relatório gerado');
  } catch (error) {
    Logger.log('Erro no relatório: ' + error.message);
  }
}

/**
 * Executa limpeza de logs antigos (semanal - domingo às 1h)
 */
function executarLimpezaLogs() {
  try {
    Logger.log('=== LIMPEZA DE LOGS ANTIGOS ===');
    
    const resultado = AuditLogger.limparLogsAntigos();
    
    AuditLogger.registrar({
      tipo: 'SISTEMA_INICIO',
      dados: resultado,
      resultado: 'LIMPEZA_CONCLUIDA'
    });
    
    Logger.log('Logs limpos: ' + resultado.linhasRemovidas);
  } catch (error) {
    Logger.log('Erro na limpeza de logs: ' + error.message);
  }
}

/**
 * Executa auditoria mensal (dia 1 de cada mês às 9h)
 */
function executarAuditoriaMensal() {
  try {
    Logger.log('=== AUDITORIA MENSAL ===');
    
    const mesAnterior = new Date();
    mesAnterior.setMonth(mesAnterior.getMonth() - 1);
    
    const relatorio = AuditLogger.gerarRelatorio({
      dataInicio: new Date(mesAnterior.getFullYear(), mesAnterior.getMonth(), 1),
      dataFim: new Date(mesAnterior.getFullYear(), mesAnterior.getMonth() + 1, 0)
    });
    
    AuditLogger.registrar({
      tipo: 'VERIFICACAO_COMPLIANCE',
      dados: { periodo: 'Mensal', totalRegistros: relatorio.totalRegistros },
      resultado: 'AUDITORIA_CONCLUIDA'
    });
    
    Logger.log('Auditoria mensal concluída');
  } catch (error) {
    Logger.log('Erro na auditoria: ' + error.message);
  }
}

/**
 * Executa monitoramento de cotas (a cada 6 horas)
 */
function executarMonitoramentoCotas() {
  try {
    const status = QuotaManager.verificarCotas();
    
    if (status.alertas.length > 0) {
      NotificationManager.notificar({
        tipo: 'AVISO',
        titulo: 'Alerta de Cotas',
        mensagem: 'Cotas próximas do limite: ' + status.alertas.join(', ')
      });
    }
  } catch (error) {
    Logger.log('Erro no monitoramento: ' + error.message);
  }
}

/**
 * Função de teste
 */
function testarTriggerManager() {
  Logger.log('=== TESTE TRIGGER MANAGER ===');
  
  // Verifica status atual
  const status = TriggerManager.verificarStatus();
  Logger.log('Status: ' + JSON.stringify(status, null, 2));
  
  // Lista triggers
  const triggers = TriggerManager.listarTriggers();
  Logger.log('Triggers ativos: ' + triggers.length);
  
  return status.statusGeral === 'OK';
}
