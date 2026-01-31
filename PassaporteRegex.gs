// Regex para números de passaporte

/**
 * Retorna regex para passaportes brasileiros
 * @return {RegExp} Expressão regular
 */
function getPassaporteRegex() {
  // Padrão para passaporte brasileiro (2 letras + 6 dígitos)
  return /\b[A-Z]{2}\d{6}\b/g;
}

/**
 * Valida número de passaporte
 * @param {string} passaporte - Passaporte a validar
 * @return {boolean} True se válido
 */
function validarPassaporte(passaporte) {
  // Verifica formato básico
  return /^[A-Z]{2}\d{6}$/.test(passaporte);
}

/**
 * Anonimiza número de passaporte
 * @param {string} passaporte - Passaporte a anonimizar
 * @return {string} Passaporte anonimizado
 */
function anonimizarPassaporte(passaporte) {
  // Mantém apenas as 2 letras iniciais
  return passaporte.substring(0, 2) + '******';
}
