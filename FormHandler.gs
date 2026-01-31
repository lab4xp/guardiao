// Manipulador de formulários web

/**
 * Processa submissão de formulário
 * @param {Object} dadosFormulario - Dados submetidos
 * @return {Object} Resposta do processamento
 */
function processarFormulario(dadosFormulario) {
  // Valida dados do formulário
  const validacao = validarDadosFormulario(dadosFormulario);
  if (!validacao.valido) {
    return {
      sucesso: false,
      erros: validacao.erros
    };
  }
  // Salva dados na planilha
  salvarDadosFormulario(dadosFormulario);
  return {
    sucesso: true,
    mensagem: 'Formulário enviado com sucesso'
  };
}

/**
 * Salva dados do formulário na planilha
 * @param {Object} dados - Dados a salvar
 */
function salvarDadosFormulario(dados) {
  // Acessa planilha de formulários
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Formularios');
  // Adiciona registro com timestamp
  sheet.appendRow([
    new Date(),
    dados.nome,
    dados.email,
    dados.mensagem
  ]);
}
