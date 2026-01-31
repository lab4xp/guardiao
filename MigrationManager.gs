// Gerenciamento de migrações de schema

/**
 * Executa migração de schema
 * @param {number} versaoAtual - Versão atual do schema
 * @param {number} versaoAlvo - Versão alvo
 */
function executarMigracao(versaoAtual, versaoAlvo) {
  // Lista migrações pendentes
  const migracoes = listarMigracoesPendentes(versaoAtual, versaoAlvo);
  // Executa cada migração
  migracoes.forEach(migracao => {
    logInfo('Executando migração', { versao: migracao.versao });
    migracao.executar();
    atualizarVersaoSchema(migracao.versao);
  });
}

/**
 * Atualiza versão do schema
 * @param {number} novaVersao - Nova versão
 */
function atualizarVersaoSchema(novaVersao) {
  // Salva versão nas configurações
  atualizarConfiguracao('VERSAO_SCHEMA', novaVersao.toString());
}

/**
 * Obtém versão atual do schema
 * @return {number} Versão atual
 */
function obterVersaoSchema() {
  // Busca versão nas configurações
  const versao = obterConfiguracao('VERSAO_SCHEMA');
  return parseInt(versao) || 1;
}
