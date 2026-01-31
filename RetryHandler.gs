// Lógica de retry para chamadas à IA

/**
 * Executa função com retry automático
 * @param {Function} funcao - Função a executar
 * @param {number} maxTentativas - Número máximo de tentativas
 * @return {*} Resultado da função
 */
function executarComRetry(funcao, maxTentativas) {
  // Tenta executar função
  let tentativa = 0;
  while (tentativa < maxTentativas) {
    try {
      // Executa função
      return funcao();
    } catch (erro) {
      tentativa++;
      // Se não é a última tentativa, aguarda e tenta novamente
      if (tentativa < maxTentativas) {
        Utilities.sleep(1000 * tentativa); // Backoff exponencial
        logInfo('Retry tentativa ' + tentativa, { erro: erro.message });
      } else {
        // Última tentativa falhou
        throw erro;
      }
    }
  }
}

/**
 * Verifica se erro é recuperável
 * @param {Error} erro - Erro a verificar
 * @return {boolean} True se é recuperável
 */
function isErroRecuperavel(erro) {
  // Define erros recuperáveis
  const errosRecuperaveis = ['timeout', 'rate limit', 'service unavailable'];
  return errosRecuperaveis.some(tipo => erro.message.toLowerCase().includes(tipo));
}
