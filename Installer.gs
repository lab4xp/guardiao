/**
 * @fileoverview Installer - Setup Automático do Guardião SEDF
 * Prepara a estrutura do Google Sheets e menus após o deployment.
 */

/**
 * Gatilho de abertura do Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🛡️ Guardião SEDF')
    .addItem('🚀 Abrir Painel de Proteção', 'abrirWebApp')
    .addSeparator()
    .addItem('⚙️ Configurar Planilha', 'setupPlanilha')
    .addItem('🔍 Validar Saúde do Sistema', 'testarPiiDetector')
    .addToUi();
}

/**
 * Abre o Web App em um diálogo modal
 */
function abrirWebApp() {
  const url = ScriptApp.getService().getUrl();
  const html = HtmlService.createHtmlOutput(
    `<script>window.open("${url}", "_blank"); google.script.host.close();</script>`
  ).setWidth(300).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(html, 'Abrindo Guardião...');
}

/**
 * Cria as abas e cabeçalhos necessários para o MVP
 */
function setupPlanilha() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = Config.getSheets().tabelas;
  
  // Lista de abas e seus cabeçalhos oficiais
  const estrutura = [
    { nome: config.documentos, headers: ['timestamp', 'nome_arquivo', 'fileId', 'status', 'total_pii', 'usuario'] },
    { nome: config.auditoria, headers: ['timestamp', 'usuario', 'perfil', 'tipo_evento', 'detalhes', 'status', 'hash_integridade'] },
    { nome: config.logs, headers: ['timestamp', 'nivel', 'modulo', 'mensagem', 'contexto'] },
    { nome: config.usuarios, headers: ['Email', 'Nome', 'Perfil', 'Status'] }
  ];

  estrutura.forEach(tab => {
    let sheet = ss.getSheetByName(tab.nome);
    if (!sheet) {
      sheet = ss.insertSheet(tab.nome);
      sheet.appendRow(tab.headers);
      sheet.getRange(1, 1, 1, tab.headers.length).setFontWeight('bold').setBackground('#080808').setFontColor('#00f2ff');
      sheet.setFrozenRows(1);
    }
  });

  // Insere usuário atual como Admin se a tabela estiver vazia
  const userSheet = ss.getSheetByName(config.usuarios);
  if (userSheet.getLastRow() === 1) {
    userSheet.appendRow([Session.getActiveUser().getEmail(), 'Administrador Principal', USER_ROLES.ADMIN, 'ATIVO']);
  }

  SpreadsheetApp.getUi().alert('✅ Ambiente Guardião SEDF configurado com sucesso!');
}
