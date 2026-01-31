// Regex otimizado para CPF

/**
 * Retorna regex para detectar CPF
 * @return {RegExp} Expressão regular para CPF
 */
function getCpfRegex() {
  // Padrão para CPF com ou sem formatação
  return /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
}

/**
 * Formata CPF no padrão brasileiro
 * @param {string} cpf - CPF sem formatação
 * @return {string} CPF formatado
 */
function formatarCpf(cpf) {
  // Remove formatação existente
  const limpo = cpf.replace(/\D/g, '');
  // Aplica máscara XXX.XXX.XXX-XX
  return limpo.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}
