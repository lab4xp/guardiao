// Cálculo de score de confiança das predições

/**
 * Calcula score de confiança para uma detecção
 * @param {Object} deteccao - Objeto com dados da detecção
 * @return {number} Score de 0 a 1
 */
function calcularScoreConfianca(deteccao) {
  // Inicia com score base
  let score = 0.5;
  // Aumenta score se passou por validação
  if (deteccao.validado) score += 0.3;
  // Aumenta score se tem contexto claro
  if (deteccao.contextoClaro) score += 0.2;
  // Limita score entre 0 e 1
  return Math.min(1, Math.max(0, score));
}

/**
 * Classifica confiança em categorias
 * @param {number} score - Score de confiança
 * @return {string} Categoria (ALTA, MEDIA, BAIXA)
 */
function classificarConfianca(score) {
  // Classifica baseado em thresholds
  if (score >= 0.8) return 'ALTA';
  if (score >= 0.5) return 'MEDIA';
  return 'BAIXA';
}
