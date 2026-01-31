// Detecção de localizações geográficas

/**
 * Detecta localizações em texto
 * @param {string} texto - Texto a analisar
 * @return {Array} Lista de localizações encontradas
 */
function detectarLocalizacoes(texto) {
  // Padrões de localização brasileira
  const padroes = [
    /Brasília|DF|Distrito Federal/gi,
    /Ceilândia|Taguatinga|Samambaia|Planaltina/gi,
    /Rua\s+[A-Za-z\s]+,\s*\d+/gi
  ];
  // Busca por cada padrão
  const localizacoes = [];
  padroes.forEach(padrao => {
    const matches = texto.match(padrao) || [];
    localizacoes.push(...matches);
  });
  return [...new Set(localizacoes)]; // Remove duplicatas
}

/**
 * Anonimiza localizações detectadas
 * @param {string} texto - Texto original
 * @return {string} Texto com localizações anonimizadas
 */
function anonimizarLocalizacoes(texto) {
  // Detecta localizações
  const localizacoes = detectarLocalizacoes(texto);
  // Substitui cada localização
  let textoAnonimizado = texto;
  localizacoes.forEach(loc => {
    textoAnonimizado = textoAnonimizado.replace(loc, '[LOCALIZAÇÃO REMOVIDA]');
  });
  return textoAnonimizado;
}
