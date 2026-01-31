/**
 * @fileoverview SensitiveDataClassifier - Classificação de dados sensíveis (LGPD Art. 5º, II)
 * Identifica termos relacionados a saúde, religião, política e sindicatos.
 */

const SensitiveDataClassifier = {
  
  // Categorias sensíveis e suas palavras-chave
  CATEGORIES: {
    [PII_TYPES.MEDICAL_DATA]: ['HIV', 'Câncer', 'Diabetes', 'Atestado Médico', 'CID', 'Prontuário', 'Cirurgia', 'Médico', 'Vacinado'],
    [PII_TYPES.RELIGIOUS_DATA]: ['Igreja', 'Templo', 'Religião', 'Evangélico', 'Católico', 'Espírita', 'Crença', 'Fé'],
    [PII_TYPES.POLITICAL_DATA]: ['Partido', 'Político', 'Filiado', 'Eleição', 'Suplente', 'PT', 'PL', 'PSDB', 'MDB'],
    [PII_TYPES.RACIAL_DATA]: ['Raça', 'Cor', 'Etnia', 'Negro', 'Branco', 'Pardo', 'Indígena', 'Quilombola'],
    [PII_TYPES.SEXUAL_ORIENTATION]: ['LGBT', 'Homossexual', 'Heterossexual', 'Orientação Sexual']
  },

  /**
   * Detecta dados sensíveis categorizados
   */
  detectar: function(texto) {
    if (!texto) return [];
    
    const resultados = [];
    const lowerTexto = texto.toLowerCase();
    
    Object.keys(this.CATEGORIES).forEach(tipo => {
      const keywords = this.CATEGORIES[tipo];
      
      keywords.forEach(keyword => {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        let match;
        
        while ((match = regex.exec(texto)) !== null) {
          resultados.push({
            tipo: tipo,
            valor: match[0],
            posicao: match.index,
            confianca: 0.85,
            metodo: 'Keyword Analysis',
            nivelRisco: SENSITIVITY_LEVELS.SENSITIVE,
            lgpd: {
              artigo: 'Art. 5º, II',
              categoria: 'Dado Sensível'
            }
          });
        }
      });
    });
    
    return resultados;
  }
};
