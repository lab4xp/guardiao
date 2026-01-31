/**
 * GUARDIÃO SEDF - Sistema de Proteção Inteligente de Dados Pessoais
 * 
 * Ponto de entrada principal do sistema
 * Implementa menu customizado e inicialização
 * 
 * @author Guardião SEDF Team
 * @version 2.0
 * @date 30/01/2026
 * 
 * Conformidade:
 * - Lei nº 12.527/2011 (LAI)
 * - Lei nº 13.709/2018 (LGPD)
 */

/**
 * Função executada ao abrir a planilha
 * Cria menu customizado do Guardião SEDF
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🛡️ Guardião SEDF')
    .addItem('📊 Dashboard Principal', 'abrirDashboard')
    .addSeparator()
    .addSubMenu(ui.createMenu('🔍 Detecção de PII')
      .addItem('Processar Documento', 'processarDocumento')
      .addItem('Processar Lote', 'processarLote')
      .addItem('Validar Resultados', 'validarResultados'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🛡️ Compliance LGPD')
      .addItem('Verificar Conformidade', 'verificarConformidade')
      .addItem('Relatório de Auditoria', 'gerarRelatorioAuditoria')
      .addItem('Direitos do Titular', 'gerenciarDireitosTitular'))
    .addSeparator()
    .addSubMenu(ui.createMenu('🤖 Integração IA')
      .addItem('Configurar Colab', 'configurarColab')
      .addItem('Testar Conexão NER', 'testarConexaoNER')
      .addItem('Atualizar URL Ngrok', 'atualizarNgrokUrl'))
    .addSeparator()
    .addSubMenu(ui.createMenu('⚙️ Configurações')
      .addItem('Configurações Gerais', 'abrirConfiguracoes')
      .addItem('Gerenciar Usuários', 'gerenciarUsuarios')
      .addItem('Backup de Dados', 'executarBackup'))
    .addSeparator()
    .addItem('📖 Ajuda', 'abrirAjuda')
    .addItem('ℹ️ Sobre', 'mostrarSobre')
    .addToUi();
  
  Logger.log('Menu Guardião SEDF carregado com sucesso');
}

/**
 * Abre o dashboard principal do sistema
 */
function abrirDashboard() {
  const html = HtmlService.createTemplateFromFile('MainDashboard')
    .evaluate()
    .setTitle('Guardião SEDF - Dashboard')
    .setWidth(1200)
    .setHeight(800);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Guardião SEDF');
}

/**
 * Processa um documento individual
 */
function processarDocumento() {
  const html = HtmlService.createTemplateFromFile('ProcessPage')
    .evaluate()
    .setTitle('Processar Documento')
    .setWidth(900)
    .setHeight(700);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Processar Documento');
}

/**
 * Processa múltiplos documentos em lote
 */
function processarLote() {
  const html = HtmlService.createTemplateFromFile('BatchProcessing')
    .evaluate()
    .setTitle('Processamento em Lote')
    .setWidth(1000)
    .setHeight(750);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Processamento em Lote');
}

/**
 * Abre interface de validação de resultados (Human-in-the-Loop)
 */
function validarResultados() {
  const html = HtmlService.createTemplateFromFile('ResultsView')
    .evaluate()
    .setTitle('Validar Resultados - Human-in-the-Loop')
    .setWidth(1100)
    .setHeight(800);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Validação de Resultados');
}

/**
 * Verifica conformidade LGPD
 */
function verificarConformidade() {
  try {
    const checker = LgpdComplianceChecker.verificarConformidade();
    
    const html = HtmlService.createTemplateFromFile('ComplianceReport')
      .evaluate()
      .setTitle('Relatório de Conformidade LGPD')
      .setWidth(900)
      .setHeight(700);
    
    SpreadsheetApp.getUi().showModalDialog(html, 'Conformidade LGPD');
  } catch (error) {
    SpreadsheetApp.getUi().alert('Erro ao verificar conformidade: ' + error.message);
  }
}

/**
 * Gera relatório de auditoria
 */
function gerarRelatorioAuditoria() {
  const html = HtmlService.createTemplateFromFile('AuditPage')
    .evaluate()
    .setTitle('Auditoria LGPD')
    .setWidth(1100)
    .setHeight(800);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Auditoria');
}

/**
 * Gerencia direitos do titular
 */
function gerenciarDireitosTitular() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Direitos do Titular (LGPD)',
    'Selecione o direito a ser exercido:\n\n' +
    '1. Acesso aos dados\n' +
    '2. Retificação\n' +
    '3. Portabilidade\n' +
    '4. Eliminação (Esquecimento)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response === ui.Button.OK) {
    // Implementação delegada aos handlers específicos
    Logger.log('Direitos do titular - Interface a ser implementada');
  }
}

/**
 * Configura integração com Google Colab
 */
function configurarColab() {
  const html = HtmlService.createTemplateFromFile('AiConfig')
    .evaluate()
    .setTitle('Configurar Integração IA')
    .setWidth(800)
    .setHeight(600);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Configuração IA');
}

/**
 * Testa conexão com servidor NER no Colab
 */
function testarConexaoNER() {
  try {
    const resultado = ColabConnector.testarConexao();
    
    if (resultado.sucesso) {
      SpreadsheetApp.getUi().alert(
        '✅ Conexão Estabelecida',
        'Servidor NER respondendo:\n\n' +
        'URL: ' + resultado.url + '\n' +
        'Status: ' + resultado.status + '\n' +
        'Modelo: ' + resultado.modelo,
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    } else {
      throw new Error(resultado.erro);
    }
  } catch (error) {
    SpreadsheetApp.getUi().alert(
      '❌ Erro de Conexão',
      'Não foi possível conectar ao servidor NER:\n\n' + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Atualiza URL do Ngrok para integração Colab
 */
function atualizarNgrokUrl() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Atualizar URL Ngrok',
    'Cole a URL do Ngrok gerada no Colab:\n(Exemplo: https://xxxx-xx-xxx-xxx-xx.ngrok-free.app)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const url = response.getResponseText().trim();
    
    if (url && url.startsWith('http')) {
      NgrokUrlUpdater.atualizarUrl(url);
      ui.alert('✅ URL atualizada com sucesso!');
    } else {
      ui.alert('❌ URL inválida. Use o formato: https://xxxx.ngrok-free.app');
    }
  }
}

/**
 * Abre painel de configurações gerais
 */
function abrirConfiguracoes() {
  const html = HtmlService.createTemplateFromFile('SettingsPage')
    .evaluate()
    .setTitle('Configurações')
    .setWidth(900)
    .setHeight(700);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Configurações');
}

/**
 * Gerencia usuários do sistema
 */
function gerenciarUsuarios() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Gerenciamento de Usuários',
    'Funcionalidade disponível para administradores.\n\n' +
    'Acesse: Menu > Configurações > Usuários',
    ui.ButtonSet.OK
  );
}

/**
 * Executa backup dos dados
 */
function executarBackup() {
  try {
    const resultado = BackupManager.executarBackup();
    
    SpreadsheetApp.getUi().alert(
      '✅ Backup Concluído',
      'Backup realizado com sucesso!\n\n' +
      'Arquivo: ' + resultado.nomeArquivo + '\n' +
      'Data: ' + resultado.timestamp + '\n' +
      'Tamanho: ' + resultado.tamanho,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error) {
    SpreadsheetApp.getUi().alert(
      '❌ Erro no Backup',
      'Não foi possível realizar o backup:\n\n' + error.message,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Abre painel de ajuda
 */
function abrirAjuda() {
  const html = HtmlService.createTemplateFromFile('HelpPanel')
    .evaluate()
    .setTitle('Ajuda - Guardião SEDF')
    .setWidth(800)
    .setHeight(600);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Ajuda');
}

/**
 * Mostra informações sobre o sistema
 */
function mostrarSobre() {
  const ui = SpreadsheetApp.getUi();
  
  ui.alert(
    '🛡️ Guardião SEDF v2.0',
    'Sistema de Proteção Inteligente de Dados Pessoais\n\n' +
    '📊 Componentes:\n' +
    '• 212 módulos Google Apps Script\n' +
    '• 65 templates HTML\n' +
    '• Integração IA (spaCy + BERTimbau)\n\n' +
    '⚖️ Conformidade Legal:\n' +
    '• Lei nº 12.527/2011 (LAI)\n' +
    '• Lei nº 13.709/2018 (LGPD)\n\n' +
    '🎯 Hackathon Participa DF 2026\n' +
    'Categoria: Acesso à Informação\n\n' +
    '📅 Versão: 2.0 | Data: 30/01/2026',
    ui.ButtonSet.OK
  );
}

/**
 * Função de instalação (executada uma vez)
 * Configura triggers e estrutura inicial
 */
function instalarSistema() {
  try {
    // Cria triggers automáticos
    TriggerManager.criarTriggers();
    
    // Inicializa estrutura de dados
    SheetsConnector.inicializarEstrutura();
    
    // Configura permissões
    PermissionManager.configurarPermissoes();
    
    Logger.log('Sistema instalado com sucesso');
    
    SpreadsheetApp.getUi().alert(
      '✅ Instalação Concluída',
      'Guardião SEDF instalado com sucesso!\n\n' +
      'O sistema está pronto para uso.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error) {
    Logger.log('Erro na instalação: ' + error.message);
    throw error;
  }
}

/**
 * Função de desinstalação
 * Remove triggers e limpa configurações
 */
function desinstalarSistema() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    '⚠️ Confirmar Desinstalação',
    'Tem certeza que deseja desinstalar o Guardião SEDF?\n\n' +
    'Esta ação removerá todos os triggers automáticos.',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    try {
      TriggerManager.removerTodosTriggers();
      
      ui.alert(
        '✅ Desinstalação Concluída',
        'Guardião SEDF desinstalado com sucesso.',
        ui.ButtonSet.OK
      );
    } catch (error) {
      ui.alert('❌ Erro na desinstalação: ' + error.message);
    }
  }
}
