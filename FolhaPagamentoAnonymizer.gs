// Anonimização de folhas de pagamento

/**
 * Anonimiza folha de pagamento
 * @param {Array} dadosFolha - Dados da folha de pagamento
 * @return {Array} Folha anonimizada
 */
function anonimizarFolhaPagamento(dadosFolha) {
  // Itera sobre cada servidor na folha
  return dadosFolha.map(servidor => {
    // Anonimiza dados pessoais mantendo dados agregados
    return [
      anonimizarNome(servidor[0]), // Nome
      anonimizarCpf(servidor[1]), // CPF
      servidor[2], // Cargo (mantém)
      servidor[3], // Salário bruto (mantém)
      servidor[4]  // Descontos (mantém)
    ];
  });
}

/**
 * Salva folha anonimizada na planilha
 * @param {Array} folhaAnonimizada - Folha já anonimizada
 * @param {string} mesReferencia - Mês de referência
 */
function salvarFolhaAnonimizada(folhaAnonimizada, mesReferencia) {
  // Acessa planilha de folhas anonimizadas
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FolhasAnonimizadas');
  // Adiciona cabeçalho com mês
  sheet.appendRow([mesReferencia, new Date()]);
  // Insere dados anonimizados
  folhaAnonimizada.forEach(row => sheet.appendRow(row));
}
