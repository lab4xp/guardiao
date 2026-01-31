// Verificação de contraste WCAG 2.1

/**
 * Calcula razão de contraste entre duas cores
 * @param {string} cor1 - Cor em hexadecimal
 * @param {string} cor2 - Cor em hexadecimal
 * @return {number} Razão de contraste
 */
function calcularContraste(cor1, cor2) {
  // Converte cores hex para RGB
  const rgb1 = hexParaRgb(cor1);
  const rgb2 = hexParaRgb(cor2);
  // Calcula luminância relativa de cada cor
  const lum1 = calcularLuminancia(rgb1);
  const lum2 = calcularLuminancia(rgb2);
  // Retorna razão de contraste
  const maior = Math.max(lum1, lum2);
  const menor = Math.min(lum1, lum2);
  return (maior + 0.05) / (menor + 0.05);
}

/**
 * Verifica se contraste atende WCAG AA
 * @param {number} contraste - Razão de contraste
 * @return {boolean} True se atende WCAG AA
 */
function atendeWcagAA(contraste) {
  // WCAG AA requer contraste mínimo de 4.5:1
  return contraste >= 4.5;
}
