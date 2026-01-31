/**
 * @fileoverview ProcessoDisciplinarHandler - Sigilo Administrativo
 * Detecta contextos de PAD (Processo Administrativo Disciplinar) e Sindicâncias.
 */

const ProcessoDisciplinarHandler = {
  
  /**
   * Identifica se o documento é um Processo Disciplinar
   */
  isPad: function(texto) {
    return /\b(PAD|Processo Administrativo Disciplinar|Sindicância|Punição|Advertência|Comissão Processante)\b/gi.test(texto);
  },

  /**
   * Aplica diretrizes de sigilo rigoroso
   */
  checkCompliance: function(texto) {
    if (this.isPad(texto)) {
      return {
        isSensitiveContext: true,
        recommendation: 'SIGILO ABSOLUTO: Documento de natureza disciplinar. Vedada a publicação sem revisão da Corregedoria.',
        maskingRequired: true
      };
    }
    return { isSensitiveContext: false };
  }
};
