/**
 * @fileoverview MaskingStrategy - Estratégias de Transformação de Dados
 * Implementa as formas técnicas de ocultar informações conforme ANONYMIZATION_STRATEGIES.
 */

const MaskingStrategy = {
  
  /**
   * Aplica mascaramento parcial (Ex: 123.***.***-90)
   */
  applyMask: function(valor, tipo) {
    if (!valor) return '';
    
    switch (tipo) {
      case PII_TYPES.CPF:
        // Lida com CPFs com ou sem pontos/traços
        const cpfLimpo = valor.replace(/\D/g, '');
        if (cpfLimpo.length === 11) {
          return cpfLimpo.substring(0, 3) + '.***.***-' + cpfLimpo.substring(9);
        }
        return '***.***.***-**';
      
      case PII_TYPES.EMAIL:
        const parts = valor.split('@');
        if (parts.length === 2) {
          return parts[0].substring(0, 2) + '****@' + parts[1];
        }
        return '****@****.***';
      
      case PII_TYPES.PHONE:
        // Mantém DDD e últimos dígitos
        const phoneLimpo = valor.replace(/\D/g, '');
        if (phoneLimpo.length >= 10) {
          return `(${phoneLimpo.substring(0, 2)}) ****-` + phoneLimpo.substring(phoneLimpo.length - 4);
        }
        return '(**) ****-****';

      case PII_TYPES.NAME:
        const nomes = valor.split(' ');
        if (nomes.length > 1) {
          return nomes[0] + ' ' + nomes[nomes.length - 1].split('').map(() => '*').join('');
        }
        return valor.substring(0, 2) + '****';
      
      default:
        // Fallback genérico para outros tipos
        return valor.length > 5 ? valor.substring(0, 2) + '...' + valor.substring(valor.length - 2) : '****';
    }
  },

  /**
   * Gera um Hash SHA-256 (Irreversível, mantém unicidade)
   */
  applyHash: function(valor) {
    if (!valor) return '';
    const signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, valor + 'GDF_SALT_2026');
    return signature.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('').substring(0, 16);
  },

  /**
   * Redação total (Texto fixo)
   */
  applyRedaction: function(tipo) {
    return `[${tipo || 'DADO'} REDIGIDO]`;
  }
};
