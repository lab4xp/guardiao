// Regex para números de RG

/**
 * Retorna regex para RG
 * @return {RegExp} Expressão regular
 */
function getRgRegex() {
  // Padrão para RG (7-9 dígitos com formatação opcional)
  return /\b\d{1,2}\.?\d{3}\.?\d{3}-?[0-9X]\b/g;
}

/**
 * Formata RG no padrão comum
 * @param {string} rg - RG sem formatação
 * @return {string} RG formatado
 */
function formatarRg(rg) {
  // Remove formatação
  const limpo = rg.replace(/\D/g, '');
  // Aplica máscara XX.XXX.XXX-X (padrão SP)
  if (limpo.length === 9) {
    return `${limpo.substring(0, 2)}.${limpo.substring(2, 5)}.${limpo.substring(5, 8)}-${limpo.substring(8)}`;
  }
  return rg;
}
