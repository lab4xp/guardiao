// Detecção de nomes de organizações

/**
 * Detecta nomes de organizações em texto
 * @param {string} texto - Texto a analisar
 * @return {Array} Lista de organizações encontradas
 */
function detectarOrganizacoes(texto) {
  // Padrões comuns de organizações
  const padroes = [
    /\b(?:Secretaria|Ministério|Departamento|Diretoria)\s+(?:de|da|do)\s+[A-Z][a-zà-ú]+/g,
    /\bSEDF\b/g,
    /\b[A-Z]{2,}\b/g // Siglas
  ];
  // Busca por cada padrão
  const organizacoes = [];
  padroes.forEach(padrao => {
    const matches = texto.match(padrao) || [];
    organizacoes.push(...matches);
  });
  return [...new Set(organizacoes)]; // Remove duplicatas
}

/**
 * Valida se texto é nome de organização
 * @param {string} texto - Texto a validar
 * @return {boolean} True se é organização
 */
function isOrganizacao(texto) {
  // Verifica padrões típicos de organizações
  return /^(?:Secretaria|Ministério|Departamento)/.test(texto) || /^[A-Z]{2,}$/.test(texto);
}
