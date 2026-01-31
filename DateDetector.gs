/**
 * @fileoverview DateDetector - Detecção de datas (Nascimento)
 */
const DateDetector = {
  
  REGEX: /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,

  detectar: function(texto) {
    if (!texto) return [];
    const resultados = [];
    let match;
    this.REGEX.lastIndex = 0;

    while ((match = this.REGEX.exec(texto)) !== null) {
      const dia = parseInt(match[1]);
      const mes = parseInt(match[2]);
      const ano = parseInt(match[3]);

      // Verifica validade da data e se é plausivelmente um nascimento
      if (this.isValidDate(dia, mes, ano) && this.isBirthDate(ano)) {
        resultados.push({
          tipo: PII_TYPES.BIRTH_DATE,
          valor: match[0],
          posicao: match.index,
          confianca: 0.9,
          metodo: 'Regex + Validation',
          nivelRisco: SENSITIVITY_LEVELS.PERSONAL,
          modulo: 'DateDetector.gs'
        });
      }
    }
    return resultados;
  },

  isValidDate: function(d, m, y) {
    return m > 0 && m <= 12 && d > 0 && d <= 31;
  },

  isBirthDate: function(year) {
    const currentYear = new Date().getFullYear();
    // Considera nascimento se entre 1900 e ano atual
    return year >= 1900 && year <= currentYear;
  }
};
