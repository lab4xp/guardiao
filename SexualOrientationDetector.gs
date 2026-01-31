// Detecção de dados sobre orientação sexual

/**
 * Detecta menções a orientação sexual
 * @param {string} texto - Texto a analisar
 * @return {Array} Termos encontrados
 */
function detectarDadosOrientacaoSexual(texto) {
  // Define termos relacionados a orientação sexual
  const termos = [
    'orientação sexual', 'homossexual', 'heterossexual',
    'bissexual', 'LGBT', 'LGBTQIA+', 'gay', 'lésbica'
  ];
  // Busca por cada termo
  const encontrados = [];
  termos.forEach(termo => {
    if (texto.toLowerCase().includes(termo.toLowerCase())) {
      encontrados.push(termo);
    }
  });
  return encontrados;
}

/**
 * Classifica sensibilidade de dados de orientação sexual
 * @param {Array} dados - Dados detectados
 * @return {string} Nível de sensibilidade
 */
function classificarSensibilidadeOrientacaoSexual(dados) {
  // Dados de orientação sexual são sempre sensíveis (Art. 5º, II LGPD)
  return dados.length > 0 ? 'ALTO' : 'BAIXO';
}
