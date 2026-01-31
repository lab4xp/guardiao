// Revisor de redações para publicação LAI

/**
 * Revisa documento para publicação LAI
 * @param {string} docId - ID do documento
 * @return {Object} Resultado da revisão
 */
function revisarParaPublicacaoLai(docId) {
  // Busca documento
  const doc = buscarDocumentoPorId(docId);
  // Detecta dados pessoais
  const pii = detectarPiiNoTexto(doc[2]);
  // Verifica se há dados que devem ser redatados
  const precisaRedacao = contarPii(pii) > 0;
  // Retorna resultado
  return {
    precisaRedacao: precisaRedacao,
    dadosDetectados: pii,
    recomendacao: precisaRedacao ? 'REDATAR_ANTES_PUBLICAR' : 'APROVADO'
  };
}

/**
 * Aplica redações automáticas
 * @param {string} docId - ID do documento
 * @return {string} Texto redatado
 */
function aplicarRedacoes(docId) {
  // Busca documento
  const doc = buscarDocumentoPorId(docId);
  let textoRedatado = doc[2];
  // Aplica redações para cada tipo de PII
  textoRedatado = textoRedatado.replace(getCpfRegex(), '[CPF REDATADO]');
  textoRedatado = textoRedatado.replace(getEmailRegex(), '[EMAIL REDATADO]');
  textoRedatado = textoRedatado.replace(getTelefoneRegex(), '[TELEFONE REDATADO]');
  return textoRedatado;
}
