/**
 * @fileoverview AddressDetector - Detecção de endereços e localizações
 * Focado em padrões brasileiros e especificidades do Distrito Federal (DF).
 */

const AddressDetector = {
  
  /**
   * Detecta endereços no texto
   */
  detectar: function(texto) {
    if (!texto) return [];
    
    // Padrões de endereços comuns + Brasília (SQN, SHIS, etc)
    const patterns = [
      /\b(?:Rua|Avenida|Av\.|Travessa|Al\.|Alameda|Setor|Quadra|Bloco)\s+[A-ZÀ-Ú0-9][A-ZÀ-Úa-zà-ú0-9\s,.]{5,}\b/gi,
      /\b(?:SQN|SQS|CLN|CLS|SHIS|SHIN|SHTN|SHN|SCS|SCRN|QMSW|QSW|CCSW)\s+\d{3}\b/gi, // Endereços Brasília
      /\bLotes?\s+[A-Z0-9-]+\b/gi,
      /\bBrasília\s*-\s*DF\b/gi
    ];
    
    const resultados = [];
    const detectados = new Set();
    
    patterns.forEach(regex => {
      let match;
      while ((match = regex.exec(texto)) !== null) {
        const valor = match[0];
        if (detectados.has(valor)) continue;
        
        resultados.push({
          tipo: PII_TYPES.ADDRESS,
          valor: valor,
          posicao: match.index,
          confianca: 0.80,
          metodo: 'Pattern Match Address',
          nivelRisco: SENSITIVITY_LEVELS.PERSONAL
        });
        detectados.add(valor);
      }
    });
    
    return resultados;
  }
};
