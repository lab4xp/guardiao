/**
 * @fileoverview BrazilianFormatValidator - Validador de formatos brasileiros
 * Reúne padrões comuns para Telefone, CEP e PIS.
 */

const BrazilianFormatValidator = {
  
  /**
   * Valida formato de Telefone (Fixo ou Celular com DDD)
   * Formatos: (61) 98888-7777, 61988887777, etc.
   */
  isPhone: function(val) {
    const clean = val.replace(/\D/g, '');
    return clean.length >= 10 && clean.length <= 11;
  },

  /**
   * Valida CEP
   */
  isCep: function(val) {
    return /^[0-9]{5}-?[0-9]{3}$/.test(val);
  },

  /**
   * Valida PIS/PASEP
   */
  isPis: function(pis) {
    pis = pis.replace(/\D/g, '');
    if (pis.length !== 11 || /^(\d)\1{10}$/.test(pis)) return false;

    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(pis.charAt(i)) * weights[i];
    }
    const rest = sum % 11;
    const dv = rest < 2 ? 0 : 11 - rest;
    return dv === parseInt(pis.charAt(10));
  }
};

/**
 * Funções globais helper (para PiiDetector chamar nomes dinâmicos se necessário)
 */
const EmailDetector = {
  detectar: function(texto) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const resultados = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
      resultados.push({
        tipo: 'EMAIL',
        valor: match[0],
        posicao: match.index,
        confianca: 0.95,
        metodo: 'Regex Pattern',
        nivelRisco: 'BAIXO'
      });
    }
    return resultados;
  }
};

const PhoneDetector = {
  detectar: function(texto) {
    const regex = /(\(?\d{2}\)?\s?\d{4,5}-?\d{4})/g;
    const resultados = [];
    let match;
    while ((match = regex.exec(texto)) !== null) {
      resultados.push({
        tipo: 'TELEFONE',
        valor: match[0],
        posicao: match.index,
        confianca: 0.90,
        metodo: 'Regex Pattern',
        nivelRisco: 'MEDIO'
      });
    }
    return resultados;
  }
};
