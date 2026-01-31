// Detecção de dados sobre convicção religiosa

/**
 * Detecta menções a dados religiosos
 * @param {string} texto - Texto a analisar
 * @return {Array} Termos religiosos encontrados
 */
function detectarDadosReligiosos(texto) {
  // Define termos relacionados a religião
  const termosReligiosos = [
    'religião', 'crença', 'fé', 'católico', 'evangélico',
    'espírita', 'ateu', 'agnóstico', 'muçulmano', 'judeu'
  ];
  // Busca por cada termo
  const encontrados = [];
  termosReligiosos.forEach(termo => {
    if (texto.toLowerCase().includes(termo)) {
      encontrados.push(termo);
    }
  });
  return encontrados;
}

/**
 * Classifica sensibilidade de dados religiosos
 * @param {Array} dadosReligiosos - Dados detectados
 * @return {string} Nível de sensibilidade
 */
function classificarSensibilidadeReligiosa(dadosReligiosos) {
  // Dados religiosos são sempre sensíveis (Art. 5º, II LGPD)
  return dadosReligiosos.length > 0 ? 'ALTO' : 'BAIXO';
}
