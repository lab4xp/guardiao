/**
 * @fileoverview Anonymizer - Orquestrador de Anonimização
 * Executa a substituição em massa de PIIs detectados utilizando as estratégias definidas.
 */

const Anonymizer = {
  
  /**
   * Anonimiza o texto completo baseado nas detecções
   * @param {string} textoOriginal
   * @param {Array} deteccoes - Array vindo do PiiDetector
   * @param {string} estrategiaGlobal - Estratégia padrão (ANONYMIZATION_STRATEGIES)
   */
  anonimizar: function(textoOriginal, deteccoes, estrategiaGlobal = ANONYMIZATION_STRATEGIES.MASK_PARTIAL) {
    if (!textoOriginal || !deteccoes.length) return { textoAnonimizado: textoOriginal, substituicoes: [] };

    // Ordena as detecções do FIM para o INÍCIO
    // Isso é crucial para não quebrar os índices (offsets) durante as substituições
    const sortedDeteccoes = [...deteccoes].sort((a, b) => b.posicao - a.posicao);
    
    let textoProcessado = textoOriginal;
    const logSubstituicoes = [];

    sortedDeteccoes.forEach(det => {
      let novoValor = '';
      
      // Decide a estratégia (pode ser personalizada por tipo ou sensibilidade)
      let estrategia = estrategiaGlobal;
      if (det.nivelRisco === SENSITIVITY_LEVELS.SENSITIVE) {
        estrategia = ANONYMIZATION_STRATEGIES.REDACT; // Dados sensíveis sempre redact por padrão
      }

      // Aplica a transformação
      switch (estrategia) {
        case ANONYMIZATION_STRATEGIES.REDACT:
          novoValor = MaskingStrategy.applyRedaction(det.tipo);
          break;
        case ANONYMIZATION_STRATEGIES.HASH:
          novoValor = MaskingStrategy.applyHash(det.valor);
          break;
        case ANONYMIZATION_STRATEGIES.PSEUDONYM:
          novoValor = PseudonymGenerator.generate(det.tipo, det.valor);
          break;
        case ANONYMIZATION_STRATEGIES.MASK_PARTIAL:
        default:
          novoValor = MaskingStrategy.applyMask(det.valor, det.tipo);
          break;
      }

      // Realiza a substituição no texto
      textoProcessado = textoProcessado.substring(0, det.posicao) + 
                        novoValor + 
                        textoProcessado.substring(det.posicao + det.valor.length);
      
      logSubstituicoes.push({
        tipo: det.tipo,
        original: det.valor,
        novo: novoValor,
        posicao: det.posicao
      });
    });

    return {
      textoAnonimizado: textoProcessado,
      substituicoes: logSubstituicoes,
      total: logSubstituicoes.length
    };
  }
};
