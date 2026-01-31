/**
 * @fileoverview PhoneDetector - Detecção de telefones
 */
const PhoneDetector = {
  
  // Regex para telefones fixos e celulares com ou sem DDD
  // Suporta: (XX) XXXX-XXXX, (XX) 9XXXX-XXXX, XX 9XXXX-XXXX, etc.
  REGEX: /(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))/g,

  detectar: function(texto) {
    if (!texto) return [];
    
    const resultados = [];
    let match;
    this.REGEX.lastIndex = 0;
    
    while ((match = this.REGEX.exec(texto)) !== null) {
      resultados.push({
        tipo: PII_TYPES.PHONE,
        valor: match[0],
        posicao: match.index,
        confianca: 0.85, 
        metodo: 'Regex Pattern',
        nivelRisco: SENSITIVITY_LEVELS.PERSONAL,
        modulo: 'PhoneDetector.gs'
      });
    }
    return resultados;
  },

  anonimizar: function(telefone) {
    const limpo = telefone.replace(/\D/g, '');
    if (limpo.length < 4) return '****';
    return `(${limpo.substring(0, 2)}) ****-**${limpo.substring(limpo.length - 2)}`;
  }
};
