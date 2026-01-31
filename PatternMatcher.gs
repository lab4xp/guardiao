// Motor de matching de padrões

/**
 * Busca padrões em texto
 * @param {string} texto - Texto a analisar
 * @param {Array} padroes - Lista de padrões regex
 * @return {Array} Matches encontrados
 */
function buscarPadroes(texto, padroes) {
  // Busca por cada padrão
  const matches = [];
  padroes.forEach(padrao => {
    const regex = new RegExp(padrao, 'g');
    const encontrados = texto.match(regex) || [];
    matches.push(...encontrados.map(m => ({ padrao, match: m })));
  });
  return matches;
}

/**
 * Aplica padrões customizados
 * @param {string} texto - Texto a analisar
 * @return {Array} Matches de padrões customizados
 */
function aplicarPadroesCustomizados(texto) {
  // Busca padrões customizados na planilha
  const padroes = listarPadroesCustomizados();
  // Aplica cada padrão
  return buscarPadroes(texto, padroes.map(p => p[1]));
}
