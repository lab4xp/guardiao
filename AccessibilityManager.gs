// Gerenciamento de acessibilidade da interface

/**
 * Verifica se o modo de alto contraste está ativado
 * @return {boolean} Status do modo de alto contraste
 */
function isHighContrastEnabled() {
  // Busca configuração na planilha de configurações do usuário
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Configuracoes');
  // Retorna o valor da célula que armazena a preferência de contraste
  return sheet.getRange('B5').getValue() === 'SIM';
}

/**
 * Ativa ou desativa o leitor de tela
 * @param {boolean} enabled - Status desejado
 */
function toggleScreenReader(enabled) {
  // Acessa a planilha de configurações de acessibilidade
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Acessibilidade');
  // Atualiza o status do leitor de tela na coluna B
  sheet.getRange('B2').setValue(enabled ? 'ATIVO' : 'INATIVO');
}
