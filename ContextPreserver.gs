// Preservação de contexto durante anonimização

/**
 * Preserva contexto ao anonimizar dados
 * @param {string} texto - Texto original
 * @param {Array} entidades - Entidades a anonimizar
 * @return {string} Texto anonimizado com contexto preservado
 */
function anonimizarComContexto(texto, entidades) {
  // Substitui entidades mantendo estrutura do texto
  let textoAnonimizado = texto;
  entidades.forEach(entidade => {
    // Substitui mantendo tamanho similar para preservar layout
    const substituicao = '[' + entidade.tipo + ']';
    textoAnonimizado = textoAnonimizado.replace(entidade.valor, substituicao);
  });
  return textoAnonimizado;
}

/**
 * Salva mapeamento de contexto na planilha
 * @param {string} docId - ID do documento
 * @param {Object} mapeamento - Mapeamento de entidades
 */
function salvarMapeamentoContexto(docId, mapeamento) {
  // Acessa planilha de mapeamentos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MapeamentosContexto');
  // Salva mapeamento como JSON
  sheet.appendRow([docId, new Date(), JSON.stringify(mapeamento)]);
}
