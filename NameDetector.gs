/**
 * @fileoverview NameDetector - Detecção heurística de nomes próprios
 * Utiliza padrões de capitalização e conectores comuns (da, de, do).
 */

const NameDetector = {
  
  // Preposições que podem compor nomes no Brasil
  CONNECTORS: ['da', 'de', 'do', 'das', 'dos', 'e'],
  
  // Títulos que precedem nomes e ajudam na detecção
  TITLES: ['Sr.', 'Sra.', 'Dr.', 'Dra.', 'Prof.', 'Profa.', 'Ministro', 'Secretário'],

  /**
   * Detecta possíveis nomes no texto
   */
  detectar: function(texto) {
    if (!texto) return [];
    
    // Regex para encontrar sequências de palavras iniciadas em maiúscula (mínimo 2 nomes)
    // Ex: João da Silva, Maria Santos
    const regex = /\b([A-ZÀ-Ú][a-zà-ú]{1,})\s((?:(?:da|de|do|das|dos|e)\s)?([A-ZÀ-Ú][a-zà-ú]{1,}))(?:\s((?:(?:da|de|do|das|dos|e)\s)?([A-ZÀ-Ú][a-zà-ú]{1,}))){0,3}\b/g;
    
    const resultados = [];
    let match;
    
    while ((match = regex.exec(texto)) !== null) {
      const nomeCompleto = match[0];
      
      // Filtro de falso positivo: Evitar frases no início de sentença que não são nomes
      // (Heurística simples: nomes próprios raramente são palavras como 'Aonde', 'Entretanto', etc)
      const stopWords = ['Aonde', 'Entretanto', 'Apesar', 'Quando', 'Onde', 'Brasília', 'Distrito', 'Goiás'];
      if (stopWords.includes(match[1])) continue;

      resultados.push({
        tipo: PII_TYPES.NAME,
        valor: nomeCompleto,
        posicao: match.index,
        confianca: 0.75, // Confiança média pois é heurístico
        metodo: 'Heurística de Capitalização',
        nivelRisco: SENSITIVITY_LEVELS.PERSONAL
      });
    }
    
    return resultados;
  }
};
