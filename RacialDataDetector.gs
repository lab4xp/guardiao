// Detecção de dados sobre origem racial/étnica

/**
 * Detecta menções a dados raciais/étnicos
 * @param {string} texto - Texto a analisar
 * @return {Array} Termos raciais encontrados
 */
function detectarDadosRaciais(texto) {
  // Define termos relacionados a raça/etnia
  const termosRaciais = [
    'raça', 'etnia', 'cor', 'negro', 'branco',
    'pardo', 'indígena', 'amarelo', 'quilombola'
  ];
  // Busca por cada termo
  const encontrados = [];
  termosRaciais.forEach(termo => {
    if (texto.toLowerCase().includes(termo)) {
      encontrados.push(termo);
    }
  });
  return encontrados;
}

/**
 * Classifica sensibilidade de dados raciais
 * @param {Array} dadosRaciais - Dados detectados
 * @return {string} Nível de sensibilidade
 */
function classificarSensibilidadeRacial(dadosRaciais) {
  // Dados raciais são sempre sensíveis (Art. 5º, II LGPD)
  return dadosRaciais.length > 0 ? 'ALTO' : 'BAIXO';
}
