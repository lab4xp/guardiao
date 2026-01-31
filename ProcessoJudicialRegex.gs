// Regex para números de processos judiciais

/**
 * Retorna regex para processos judiciais
 * @return {RegExp} Expressão regular
 */
function getProcessoJudicialRegex() {
  // Padrão CNJ: NNNNNNN-DD.AAAA.J.TR.OOOO
  return /\b\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}\b/g;
}

/**
 * Valida número de processo judicial
 * @param {string} processo - Processo a validar
 * @return {boolean} True se válido
 */
function validarProcessoJudicial(processo) {
  // Verifica formato CNJ
  return /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/.test(processo);
}

/**
 * Anonimiza número de processo judicial
 * @param {string} processo - Processo a anonimizar
 * @return {string} Processo anonimizado
 */
function anonimizarProcessoJudicial(processo) {
  // Mantém apenas ano e tribunal
  const partes = processo.split('.');
  return '*******-**.'+partes[1]+'.'+partes[2]+'.'+partes[3]+'.*****';
}
