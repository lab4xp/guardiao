/**
 * @fileoverview CnpjValidator - Validador de CNPJ (Módulo 11)
 * Detecta e valida CNPJ no formato 00.000.000/0000-00 ou apenas números.
 */

const CnpjValidator = {
  
  /**
   * Detecta CNPJs em um texto
   */
  detectar: function(texto) {
    const regex = /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b|\b\d{14}\b/g;
    const resultados = [];
    let match;
    
    while ((match = regex.exec(texto)) !== null) {
      const valor = match[0];
      const limpo = valor.replace(/\D/g, '');
      
      if (this.validar(limpo)) {
        resultados.push({
          tipo: 'CNPJ',
          valor: valor,
          posicao: match.index,
          confianca: 1.0,
          metodo: 'Algoritmo Módulo 11',
          nivelRisco: 'BAIXO' // CNPJ geralmente é público, mas identificador pessoal se for MEI
        });
      }
    }
    return resultados;
  },

  /**
   * Valida CNPJ usando algoritmo oficial
   */
  validar: function(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '' || cnpj.length != 14) return false;

    // Elimina CNPJs conhecidos inválidos
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || 
        cnpj == "22222222222222" || cnpj == "33333333333333" || 
        cnpj == "44444444444444" || cnpj == "55555555555555" || 
        cnpj == "66666666666666" || cnpj == "77777777777777" || 
        cnpj == "88888888888888" || cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
};
