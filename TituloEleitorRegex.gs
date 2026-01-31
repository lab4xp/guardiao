// Regex para título de eleitor

/**
 * Retorna regex para título de eleitor
 * @return {RegExp} Expressão regular
 */
function getTituloEleitorRegex() {
  // Padrão para título de eleitor (12 dígitos)
  return /\b\d{4}\s?\d{4}\s?\d{4}\b/g;
}

/**
 * Valida número de título de eleitor
 * @param {string} titulo - Título a validar
 * @return {boolean} True se válido
 */
function validarTituloEleitor(titulo) {
  // Remove espaços
  const limpo = titulo.replace(/\s/g, '');
  // Verifica se tem 12 dígitos
  return limpo.length === 12 && /^\d+$/.test(limpo);
}

/**
 * Formata título de eleitor
 * @param {string} titulo - Título sem formatação
 * @return {string} Título formatado
 */
function formatarTituloEleitor(titulo) {
  // Remove formatação
  const limpo = titulo.replace(/\D/g, '');
  // Aplica máscara XXXX XXXX XXXX
  return `${limpo.substring(0, 4)} ${limpo.substring(4, 8)} ${limpo.substring(8)}`;
}
