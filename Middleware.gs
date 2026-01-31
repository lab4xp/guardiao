// Middleware para validação e autenticação

/**
 * Middleware de autenticação
 * @param {Function} funcao - Função a executar
 * @return {Function} Função com autenticação
 */
function comAutenticacao(funcao) {
  return function() {
    // Verifica se usuário está autenticado
    const email = Session.getActiveUser().getEmail();
    if (!verificarPermissao(email)) {
      throw new Error('Acesso negado');
    }
    // Executa função original
    return funcao.apply(this, arguments);
  };
}

/**
 * Middleware de validação de dados
 * @param {Object} dados - Dados a validar
 * @param {Object} schema - Schema de validação
 * @return {boolean} True se válido
 */
function validarDados(dados, schema) {
  // Valida cada campo do schema
  for (let campo in schema) {
    if (schema[campo].obrigatorio && !dados[campo]) {
      throw new Error(`Campo obrigatório ausente: ${campo}`);
    }
  }
  return true;
}
