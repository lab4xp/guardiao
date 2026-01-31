// Validação de integridade de dados

/**
 * Valida integridade de um registro
 * @param {Object} registro - Registro a validar
 * @return {Object} Resultado da validação
 */
function validarIntegridadeRegistro(registro) {
  // Verifica campos obrigatórios
  const camposObrigatorios = ['id', 'data', 'status'];
  const camposFaltantes = camposObrigatorios.filter(campo => !registro[campo]);
  // Verifica formato de dados
  const errosFormato = [];
  if (registro.email && !validarEmail(registro.email)) {
    errosFormato.push('Email inválido');
  }
  // Retorna resultado da validação
  return {
    valido: camposFaltantes.length === 0 && errosFormato.length === 0,
    camposFaltantes: camposFaltantes,
    errosFormato: errosFormato
  };
}

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @return {boolean} True se válido
 */
function validarEmail(email) {
  // Regex simples para validação de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
