// Detecção de dados médicos sensíveis

/**
 * Detecta dados médicos em texto
 * @param {string} texto - Texto a analisar
 * @return {Array} Lista de termos médicos encontrados
 */
function detectarDadosMedicos(texto) {
  // Define termos médicos sensíveis
  const termosMedicos = [
    'diagnóstico', 'doença', 'tratamento', 'medicamento',
    'cirurgia', 'internação', 'exame', 'sintoma',
    'HIV', 'AIDS', 'câncer', 'diabetes'
  ];
  // Busca por cada termo
  const encontrados = [];
  termosMedicos.forEach(termo => {
    if (texto.toLowerCase().includes(termo.toLowerCase())) {
      encontrados.push(termo);
    }
  });
  return encontrados;
}

/**
 * Classifica sensibilidade de dados médicos
 * @param {Array} dadosMedicos - Dados médicos detectados
 * @return {string} Nível de sensibilidade
 */
function classificarSensibilidadeMedica(dadosMedicos) {
  // Dados críticos (HIV, AIDS, câncer)
  const criticos = ['HIV', 'AIDS', 'câncer'];
  const temCritico = dadosMedicos.some(d => criticos.includes(d));
  // Retorna classificação
  if (temCritico) return 'CRITICO';
  if (dadosMedicos.length > 0) return 'ALTO';
  return 'BAIXO';
}
