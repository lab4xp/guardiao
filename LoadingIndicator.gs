// Indicador de carregamento

/**
 * Exibe indicador de carregamento
 * @param {string} mensagem - Mensagem a exibir
 */
function exibirCarregamento(mensagem) {
  // Cria toast com mensagem de carregamento
  SpreadsheetApp.getActiveSpreadsheet().toast(mensagem, 'Processando...', -1);
}

/**
 * Oculta indicador de carregamento
 */
function ocultarCarregamento() {
  // Remove toast
  SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
}

/**
 * Executa função com indicador de carregamento
 * @param {Function} funcao - Função a executar
 * @param {string} mensagem - Mensagem de carregamento
 */
function executarComCarregamento(funcao, mensagem) {
  // Exibe carregamento
  exibirCarregamento(mensagem);
  try {
    // Executa função
    funcao();
  } finally {
    // Oculta carregamento
    ocultarCarregamento();
  }
}
