/**
 * @fileoverview EmailDetector - Detecção de endereços de e-mail
 */
const EmailDetector = {

  // Regex oficial para emails (RFC 5322 simplificado para uso prático)
  REGEX: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

  /**
   * Detecta emails em um texto
   */
  detectar: function(texto) {
    if (!texto) return [];

    const resultados = [];
    let match;

    // Reset lastIndex manualmente (embora com matchAll/loop de exec seja automático, 
    // é boa prática garantir reset se a regex for reutilizada em contextos diferentes, 
    // mas aqui ela é constante do objeto)
    this.REGEX.lastIndex = 0;

    while ((match = this.REGEX.exec(texto)) !== null) {
      resultados.push({
        tipo: PII_TYPES.EMAIL,
        valor: match[0],
        posicao: match.index,
        confianca: 1.0,
        metodo: 'Regex Pattern',
        nivelRisco: SENSITIVITY_LEVELS.PERSONAL,
        modulo: 'EmailDetector.gs'
      });
    }
    return resultados;
  },
  
  /**
   * Anonimiza o email mantendo domínio parcial
   */
  anonimizar: function(email) {
     const partes = email.split('@');
     if (partes.length !== 2) return '***@***.***';
     return partes[0].substring(0, 2) + '***@' + partes[1];
  }
};
