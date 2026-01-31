// Regex otimizado para CNPJ

/**
 * Retorna regex para detectar CNPJ
 * @return {RegExp} Expressão regular para CNPJ
 */
function getCnpjRegex() {
  // Padrão para CNPJ com ou sem formatação
  return /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g;
}

/**
 * Remove formatação do CNPJ
 * @param {string} cnpj - CNPJ formatado
 * @return {string} CNPJ apenas com números
 */
function limparCnpj(cnpj) {
  // Remove pontos, barras e hífens
  return cnpj.replace(/[.\-\/]/g, '');
}

/**
 * Formata CNPJ no padrão brasileiro
 * @param {string} cnpj - CNPJ sem formatação
 * @return {string} CNPJ formatado
 */
function formatarCnpj(cnpj) {
  // Remove formatação existente
  const limpo = limparCnpj(cnpj);
  // Aplica máscara XX.XXX.XXX/XXXX-XX
  return limpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}
