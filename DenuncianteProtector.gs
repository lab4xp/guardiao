// Proteção de identidade de denunciantes

/**
 * Anonimiza identidade de denunciante
 * @param {Object} dadosDenunciante - Dados do denunciante
 * @return {string} ID anonimizado
 */
function anonimizarDenunciante(dadosDenunciante) {
  // Gera hash único para o denunciante
  const identificador = dadosDenunciante.email + dadosDenunciante.cpf;
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, identificador);
  // Retorna ID anonimizado
  return 'ANON-' + Utilities.base64Encode(hash).substring(0, 10);
}

/**
 * Armazena mapeamento seguro de denunciante
 * @param {string} idAnonimo - ID anonimizado
 * @param {Object} dadosReais - Dados reais (criptografados)
 */
function armazenarMapeamentoDenunciante(idAnonimo, dadosReais) {
  // Armazena em propriedades do script (seguro)
  const props = PropertiesService.getScriptProperties();
  // Salva dados criptografados
  props.setProperty('DENUNCIANTE_' + idAnonimo, JSON.stringify(dadosReais));
}
