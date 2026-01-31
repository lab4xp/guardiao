// Classificação de tópicos de documentos

/**
 * Classifica tópico de um documento
 * @param {string} texto - Texto do documento
 * @return {string} Tópico classificado
 */
function classificarTopico(texto) {
  // Define palavras-chave por tópico
  const topicos = {
    'RH': ['servidor', 'folha', 'pagamento', 'salário'],
    'EDUCACAO': ['aluno', 'escola', 'professor', 'ensino'],
    'JURIDICO': ['processo', 'judicial', 'lei', 'direito'],
    'ADMINISTRATIVO': ['contrato', 'licitação', 'compra']
  };
  // Conta ocorrências de palavras-chave
  const scores = {};
  Object.keys(topicos).forEach(topico => {
    scores[topico] = 0;
    topicos[topico].forEach(palavra => {
      if (texto.toLowerCase().includes(palavra)) {
        scores[topico]++;
      }
    });
  });
  // Retorna tópico com maior score
  let topicoMax = 'GERAL';
  let scoreMax = 0;
  Object.keys(scores).forEach(topico => {
    if (scores[topico] > scoreMax) {
      scoreMax = scores[topico];
      topicoMax = topico;
    }
  });
  return topicoMax;
}
