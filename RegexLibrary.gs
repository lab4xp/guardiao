// Biblioteca de expressões regulares otimizadas

/**
 * Retorna todas as regex disponíveis
 * @return {Object} Objeto com todas as regex
 */
function obterTodasRegex() {
  // Retorna objeto com todas as regex do sistema
  return {
    cpf: getCpfRegex(),
    cnpj: getCnpjRegex(),
    email: getEmailRegex(),
    telefone: getTelefoneRegex(),
    cep: getCepRegex(),
    rg: getRgRegex(),
    cnh: getCnhRegex(),
    pis: getPisRegex(),
    passaporte: getPassaporteRegex(),
    placa: getPlacaVeiculoRegex(),
    processoJudicial: getProcessoJudicialRegex(),
    matricula: getMatriculaRegex()
  };
}

/**
 * Testa regex contra um texto
 * @param {RegExp} regex - Regex a testar
 * @param {string} texto - Texto de teste
 * @return {Array} Matches encontrados
 */
function testarRegex(regex, texto) {
  // Retorna todos os matches
  return texto.match(regex) || [];
}
