// Regex para datas em formato brasileiro

/**
 * Retorna regex para datas no formato DD/MM/AAAA
 * @return {RegExp} Expressão regular
 */
function getDataBrasileiraRegex() {
  // Padrão para data brasileira
  return /\b\d{2}\/\d{2}\/\d{4}\b/g;
}

/**
 * Valida se uma data está no formato correto
 * @param {string} data - Data a validar
 * @return {boolean} True se válida
 */
function validarDataBrasileira(data) {
  // Verifica formato
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
  // Valida valores de dia, mês e ano
  const partes = data.split('/');
  const dia = parseInt(partes[0]);
  const mes = parseInt(partes[1]);
  const ano = parseInt(partes[2]);
  return dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12 && ano >= 1900;
}
