// Pontuação de prioridade de processamento

/**
 * Calcula score de prioridade para documento
 * @param {Object} documento - Dados do documento
 * @return {number} Score de prioridade (0-100)
 */
function calcularPrioridade(documento) {
  // Inicia com score base
  let score = 50;
  // Aumenta prioridade se contém dados sensíveis
  if (documento.dadosSensiveis) score += 30;
  // Aumenta se é urgente
  if (documento.urgente) score += 20;
  // Reduz se já foi processado parcialmente
  if (documento.processadoParcialmente) score -= 10;
  // Limita entre 0 e 100
  return Math.min(100, Math.max(0, score));
}

/**
 * Ordena documentos por prioridade
 * @param {Array} documentos - Lista de documentos
 * @return {Array} Documentos ordenados
 */
function ordenarPorPrioridade(documentos) {
  // Calcula prioridade de cada documento
  return documentos.sort((a, b) => {
    return calcularPrioridade(b) - calcularPrioridade(a);
  });
}
