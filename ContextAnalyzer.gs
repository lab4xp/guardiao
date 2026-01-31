// Análise de contexto para redução de falsos positivos

/**
 * Analisa contexto ao redor de uma entidade detectada
 * @param {string} texto - Texto completo
 * @param {number} posicao - Posição da entidade
 * @return {Object} Contexto analisado
 */
function analisarContexto(texto, posicao) {
  // Extrai 50 caracteres antes e depois
  const inicio = Math.max(0, posicao - 50);
  const fim = Math.min(texto.length, posicao + 50);
  const contexto = texto.substring(inicio, fim);
  // Analisa palavras-chave no contexto
  const temIndicadorPublico = /público|publicado|divulgado/i.test(contexto);
  return {
    contexto: contexto,
    provavelmentePublico: temIndicadorPublico
  };
}

/**
 * Verifica se entidade é falso positivo baseado no contexto
 * @param {string} entidade - Entidade detectada
 * @param {Object} contexto - Contexto analisado
 * @return {boolean} True se é falso positivo
 */
function isFalsoPositivo(entidade, contexto) {
  // Verifica se contexto indica dado público
  return contexto.provavelmentePublico;
}
