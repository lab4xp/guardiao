// Detecção de dados sobre opinião política

/**
 * Detecta menções a opiniões políticas
 * @param {string} texto - Texto a analisar
 * @return {Array} Termos políticos encontrados
 */
function detectarDadosPoliticos(texto) {
  // Define termos relacionados a política
  const termosPoliticos = [
    'partido', 'filiação', 'voto', 'eleição',
    'candidato', 'político', 'ideologia', 'esquerda', 'direita'
  ];
  // Busca por cada termo
  const encontrados = [];
  termosPoliticos.forEach(termo => {
    if (texto.toLowerCase().includes(termo)) {
      encontrados.push(termo);
    }
  });
  return encontrados;
}

/**
 * Classifica sensibilidade de dados políticos
 * @param {Array} dadosPoliticos - Dados detectados
 * @return {string} Nível de sensibilidade
 */
function classificarSensibilidadePolitica(dadosPoliticos) {
  // Dados políticos são sempre sensíveis (Art. 5º, II LGPD)
  return dadosPoliticos.length > 0 ? 'ALTO' : 'BAIXO';
}
