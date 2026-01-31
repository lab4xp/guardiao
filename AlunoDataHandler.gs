/**
 * @fileoverview AlunoDataHandler - Tratamento de Dados de Menores
 * Eleva o nível de proteção para dados escolares conforme o Art. 14 da LGPD.
 */

const AlunoDataHandler = {
  
  /**
   * Avalia se as detecções pertencem a um contexto escolar/de menores
   * @param {string} texto
   * @param {Array} deteccoes
   */
  process: function(texto, deteccoes) {
    const contextoEscolar = /\b(aluno|menor|estudante|infantil|escolar|turma|serie)\b/gi.test(texto);
    
    if (contextoEscolar) {
      return deteccoes.map(det => {
        // Eleva o risco de PERSONAL para CRITICAL em contexto de menor
        if (det.nivelRisco === SENSITIVITY_LEVELS.PERSONAL) {
          det.nivelRisco = SENSITIVITY_LEVELS.CRITICAL;
          det.nota = 'Proteção especial: Contexto de Menor de Idade (Art. 14 LGPD)';
        }
        return det;
      });
    }
    
    return deteccoes;
  }
};
