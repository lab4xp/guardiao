/**
 * @fileoverview MatriculaDetector - Detector de Matrículas SEDF
 * Identifica o padrão oficial de matrículas da Secretaria de Educação do DF.
 */

const MatriculaDetector = {
  
  /**
   * Padrão oficial: 7 dígitos seguidos de um traço e um dígito verificador
   */
  REGEX: /\b(\d{7}-\d)\b/g,

  /**
   * Detecta matrículas no texto
   */
  detectar: function(texto) {
    if (!texto) return [];
    
    const resultados = [];
    let match;
    
    while ((match = this.REGEX.exec(texto)) !== null) {
      resultados.push({
        tipo: PII_TYPES.MATRICULA,
        valor: match[1],
        posicao: match.index,
        confianca: 1.0,
        metodo: 'SEDF Pattern Match',
        nivelRisco: SENSITIVITY_LEVELS.PERSONAL,
        modulo: 'MatriculaDetector.gs'
      });
    }
    
    return resultados;
  }
};
