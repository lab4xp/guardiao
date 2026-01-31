/**
 * @fileoverview NerProcessor - Orquestrador de Inteligência Artificial
 * Gerencia a fusão entre detecção determinística e probabilística.
 */

const NerProcessor = {
  
  /**
   * Orquestra a detecção completa
   * @param {string} texto
   * @param {Object} options - { useAi: boolean }
   */
  process: function(texto, options = { useAi: true }) {
    const results = [];
    
    // 1. Sempre executa detecção determinística primeiro (Regex/Heurística)
    // Isso garante que CPF/CNPJ (99% precisão) sejam prioridade
    if (typeof PiiDetector !== 'undefined') {
      results.push(...PiiDetector.detectar(texto, { usarNER: false }));
    }

    // 2. Se habilitado, busca reforço na IA (NER)
    if (options.useAi) {
      const aiEntities = SpacyIntegration.processar(texto);
      
      // 3. Mescla resultados evitando sobreposição
      aiEntities.forEach(aiEnt => {
        if (!this.isOverlapping(aiEnt, results)) {
          results.push(aiEnt);
        }
      });
    }

    return results;
  },

  /**
   * Verifica se uma entidade da IA sobrepõe uma já detectada por Regex
   * @private
   */
  isOverlapping: function(newEnt, existingResults) {
    return existingResults.some(oldEnt => {
      const oldEnd = oldEnt.posicao + oldEnt.valor.length;
      const newEnd = newEnt.posicao + newEnt.valor.length;
      
      // Checa interseção de intervalos [posiçaõ, fim]
      return (newEnt.posicao >= oldEnt.posicao && newEnt.posicao < oldEnd) ||
             (oldEnt.posicao >= newEnt.posicao && oldEnt.posicao < newEnd);
    });
  }
};
