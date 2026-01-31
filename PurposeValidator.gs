// Validação de finalidade do tratamento de dados

/**
 * Valida se finalidade é legítima conforme LGPD
 * @param {string} finalidade - Finalidade declarada
 * @return {Object} Resultado da validação
 */
function validarFinalidade(finalidade) {
  // Define finalidades legítimas
  const finalidadesLegitimas = [
    'cumprimento_obrigacao_legal',
    'execucao_politica_publica',
    'exercicio_regular_direito',
    'protecao_credito',
    'tutela_saude'
  ];
  // Verifica se finalidade é legítima
  const legitima = finalidadesLegitimas.includes(finalidade);
  return {
    valida: legitima,
    finalidade: finalidade,
    baseLegal: legitima ? 'Art. 7º LGPD' : null
  };
}

/**
 * Verifica se finalidade está documentada
 * @param {string} docId - ID do documento
 * @return {boolean} True se documentada
 */
function verificarFinalidade(docId) {
  // Busca finalidade na planilha de documentos
  const doc = buscarDocumentoPorId(docId);
  // Verifica se campo finalidade está preenchido
  return doc[8] && doc[8].length > 0;
}
