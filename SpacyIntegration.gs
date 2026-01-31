/**
 * @fileoverview SpacyIntegration - Integração Semântica
 * Converte os resultados do spaCy para o modelo de dados do Guardião SEDF.
 */

const SpacyIntegration = {
  
  /**
   * Mapeamento de Labels spaCy -> Guardião
   */
  LABEL_MAP: {
    'PER': PII_TYPES.NAME,
    'LOC': PII_TYPES.ADDRESS,
    'ORG': 'ORGANIZACAO',
    'MISC': 'OUTRO'
  },

  /**
   * Processa o texto via IA e normaliza resultados
   */
  processar: function(texto) {
    if (!texto) return [];
    
    // Chama o conector
    const rawEntities = ColabConnector.fetchNer(texto);
    
    // Normaliza para o formato do sistema
    return rawEntities.map(ent => {
      return {
        tipo: this.LABEL_MAP[ent.label] || ent.label,
        valor: ent.texto,
        posicao: ent.inicio,
        confianca: ent.confianca || 0.85,
        metodo: 'Deep Learning (spaCy)',
        nivelRisco: this.getNivelRisco(ent.label),
        modulo: 'SpacyIntegration.gs'
      };
    });
  },

  /**
   * Define nível de risco baseado na categoria da IA
   */
  getNivelRisco: function(label) {
    switch (label) {
      case 'PER': return SENSITIVITY_LEVELS.PERSONAL;
      case 'LOC': return SENSITIVITY_LEVELS.PERSONAL;
      case 'ORG': return SENSITIVITY_LEVELS.PERSONAL;
      default: return SENSITIVITY_LEVELS.NONE;
    }
  }
};
