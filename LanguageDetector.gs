// Detecção de idioma do documento

/**
 * Detecta idioma de um texto
 * @param {string} texto - Texto a analisar
 * @return {string} Código do idioma (pt, en, es, etc)
 */
function detectarIdioma(texto) {
  // Usa LanguageApp do Google Apps Script
  try {
    const idioma = LanguageApp.translate(texto.substring(0, 100), '', 'pt').split('|')[0];
    return idioma || 'pt';
  } catch (e) {
    // Fallback: assume português
    return 'pt';
  }
}

/**
 * Verifica se texto está em português
 * @param {string} texto - Texto a verificar
 * @return {boolean} True se em português
 */
function isPortugues(texto) {
  // Detecta idioma e compara
  const idioma = detectarIdioma(texto);
  return idioma === 'pt';
}
