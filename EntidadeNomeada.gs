// Modelo para entidades nomeadas detectadas

/**
 * Cria entidade nomeada
 * @param {string} texto - Texto da entidade
 * @param {string} tipo - Tipo da entidade (PESSOA, LOCAL, ORG)
 * @param {number} posicao - Posição no texto
 * @return {Object} Objeto de entidade
 */
function criarEntidadeNomeada(texto, tipo, posicao) {
  // Cria objeto de entidade
  return {
    texto: texto,
    tipo: tipo,
    posicao: posicao,
    confianca: 0.8,
    timestamp: new Date()
  };
}

/**
 * Salva entidade detectada na planilha
 * @param {string} docId - ID do documento
 * @param {Object} entidade - Entidade detectada
 */
function salvarEntidadeNomeada(docId, entidade) {
  // Acessa planilha de entidades
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EntidadesNomeadas');
  // Adiciona registro da entidade
  sheet.appendRow([
    docId,
    entidade.texto,
    entidade.tipo,
    entidade.posicao,
    entidade.confianca
  ]);
}
