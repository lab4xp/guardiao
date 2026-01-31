// Regex para matrículas SEDF

/**
 * Retorna regex para matrículas SEDF
 * @return {RegExp} Expressão regular
 */
function getMatriculaRegex() {
  // Padrão para matrícula SEDF (6 dígitos + hífen + 1 dígito)
  return /\b\d{6}-\d{1}\b/g;
}

/**
 * Formata matrícula no padrão SEDF
 * @param {string} matricula - Matrícula sem formatação
 * @return {string} Matrícula formatada
 */
function formatarMatricula(matricula) {
  // Remove formatação existente
  const limpo = matricula.replace(/\D/g, '');
  // Aplica máscara XXXXXX-X
  return limpo.substring(0, 6) + '-' + limpo.substring(6, 7);
}
