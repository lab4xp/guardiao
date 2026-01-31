// Detecção de números de RG

/**
 * Detecta números de RG em texto
 * @param {string} texto - Texto a analisar
 * @return {Array} Lista de RGs encontrados
 */
function detectarRgs(texto) {
  // Usa regex para encontrar padrões de RG
  const regex = getRgRegex();
  // Retorna matches encontrados
  return texto.match(regex) || [];
}

/**
 * Valida número de RG
 * @param {string} rg - RG a validar
 * @return {boolean} True se válido
 */
function validarRg(rg) {
  // Remove formatação
  const limpo = rg.replace(/\D/g, '');
  // Verifica tamanho (varia por estado, geralmente 7-9 dígitos)
  return limpo.length >= 7 && limpo.length <= 9;
}

/**
 * Anonimiza número de RG
 * @param {string} rg - RG a anonimizar
 * @return {string} RG anonimizado
 */
function anonimizarRg(rg) {
  // Mantém apenas primeiros 2 dígitos
  const limpo = rg.replace(/\D/g, '');
  return limpo.substring(0, 2) + '*'.repeat(limpo.length - 2);
}
