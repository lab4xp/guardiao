// Detecção de assinaturas em documentos

/**
 * Detecta assinaturas em texto
 * @param {string} texto - Texto a analisar
 * @return {Array} Assinaturas encontradas
 */
function detectarAssinaturas(texto) {
  // Padrões comuns de assinatura
  const padroes = [
    /Assinado\s+por:\s+([A-Za-zÀ-ÿ\s]+)/gi,
    /Atenciosamente,\s+([A-Za-zÀ-ÿ\s]+)/gi,
    /Cordialmente,\s+([A-Za-zÀ-ÿ\s]+)/gi
  ];
  // Busca por cada padrão
  const assinaturas = [];
  padroes.forEach(padrao => {
    const matches = texto.match(padrao) || [];
    assinaturas.push(...matches);
  });
  return assinaturas;
}

/**
 * Remove assinaturas de um texto
 * @param {string} texto - Texto original
 * @return {string} Texto sem assinaturas
 */
function removerAssinaturas(texto) {
  // Remove padrões de assinatura
  let textoLimpo = texto;
  textoLimpo = textoLimpo.replace(/Assinado\s+por:.*$/gim, '');
  textoLimpo = textoLimpo.replace(/Atenciosamente,.*$/gim, '');
  textoLimpo = textoLimpo.replace(/Cordialmente,.*$/gim, '');
  return textoLimpo;
}
