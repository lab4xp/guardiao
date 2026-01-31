// Fusão de spans de entidades detectadas

/**
 * Mescla spans sobrepostos de entidades
 * @param {Array} spans - Lista de spans detectados
 * @return {Array} Spans mesclados
 */
function mesclarSpans(spans) {
  // Ordena spans por posição inicial
  const ordenados = spans.sort((a, b) => a.inicio - b.inicio);
  // Mescla spans sobrepostos
  const mesclados = [];
  let atual = ordenados[0];
  for (let i = 1; i < ordenados.length; i++) {
    const proximo = ordenados[i];
    // Se sobrepõe, mescla
    if (proximo.inicio <= atual.fim) {
      atual.fim = Math.max(atual.fim, proximo.fim);
      atual.texto += ' ' + proximo.texto;
    } else {
      // Não sobrepõe, adiciona atual e avança
      mesclados.push(atual);
      atual = proximo;
    }
  }
  mesclados.push(atual);
  return mesclados;
}

/**
 * Remove spans duplicados
 * @param {Array} spans - Lista de spans
 * @return {Array} Spans únicos
 */
function removerSpansDuplicados(spans) {
  // Remove duplicatas baseado em texto e posição
  const unicos = [];
  spans.forEach(span => {
    const existe = unicos.some(u => u.texto === span.texto && u.inicio === span.inicio);
    if (!existe) unicos.push(span);
  });
  return unicos;
}
