/**
 * @fileoverview PseudonymGenerator - Gerador de Pseudônimos
 * Transforma nomes reais em identificadores sintéticos (Titular A, Aluno 1, etc).
 */

const PseudonymGenerator = {
  
  /**
   * Gera um pseudônimo baseado no tipo
   * @param {string} tipo - Tipo de PII
   * @param {string} valor - Valor original (para garantir que o mesmo nome receba o mesmo pseudônimo na mesma sessão)
   */
  generate: function(tipo, valor) {
    const hash = MaskingStrategy.applyHash(valor).toUpperCase();
    
    switch (tipo) {
      case PII_TYPES.NAME:
        return 'Titular_' + hash.substring(0, 4);
      case PII_TYPES.MATRICULA:
        return 'MAT_' + hash.substring(0, 6);
      default:
        return 'ID_' + hash;
    }
  }
};
