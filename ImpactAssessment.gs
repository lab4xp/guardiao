// Relatório de Impacto à Proteção de Dados (RIPD)

/**
 * Gera RIPD para um projeto
 * @param {Object} dadosProjeto - Dados do projeto
 * @return {Object} RIPD gerado
 */
function gerarRipd(dadosProjeto) {
  // Avalia riscos do projeto
  const riscos = avaliarRiscos(dadosProjeto);
  // Define medidas de mitigação
  const medidas = definirMedidasMitigacao(riscos);
  // Cria RIPD
  const ripd = {
    projeto: dadosProjeto.nome,
    data: new Date(),
    riscos: riscos,
    medidas: medidas,
    responsavel: Session.getActiveUser().getEmail()
  };
  // Salva RIPD na planilha
  salvarRipd(ripd);
  return ripd;
}

/**
 * Salva RIPD na planilha
 * @param {Object} ripd - RIPD a salvar
 */
function salvarRipd(ripd) {
  // Acessa planilha de RIPDs
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RIPDs');
  // Adiciona registro
  sheet.appendRow([
    ripd.data,
    ripd.projeto,
    JSON.stringify(ripd.riscos),
    JSON.stringify(ripd.medidas),
    ripd.responsavel
  ]);
}
