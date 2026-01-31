// Tratamento de direito à retificação

/**
 * Processa solicitação de retificação de dados (Art. 18, III LGPD)
 * @param {string} cpf - CPF do titular
 * @param {Object} correcoes - Dados a corrigir
 */
function processarDireitoRetificacao(cpf, correcoes) {
  // Anonimiza CPF
  const cpfHash = anonimizarCpf(cpf);
  // Registra solicitação
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SolicitacoesRetificacao');
  sheet.appendRow([
    new Date(),
    cpfHash,
    JSON.stringify(correcoes),
    'PENDENTE_ANALISE'
  ]);
  // Notifica DPO para análise
  notificarDpo('Solicitação de Retificação', `Titular solicita correção de dados`);
}

/**
 * Registra solicitação de direito
 * @param {string} tipoDireito - Tipo do direito (ACESSO, RETIFICACAO, etc)
 * @param {string} cpfHash - CPF anonimizado
 */
function registrarSolicitacaoDireito(tipoDireito, cpfHash) {
  // Registra na planilha de solicitações
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SolicitacoesDireitos');
  sheet.appendRow([
    new Date(),
    tipoDireito,
    cpfHash,
    Session.getActiveUser().getEmail()
  ]);
}
