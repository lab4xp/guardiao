/**
 * @fileoverview DataRetentionManager - Gestão de Retenção e Descarte de Dados
 * Implementa políticas de ciclo de vida de dados (Art. 15 e 16 LGPD).
 */

const DataRetentionManager = {

  /**
   * Define política de retenção
   */
  definirPolitica: function(tipoDado, dias) {
    try {
      const sheet = SheetsConnector.getSheet('politicas_retencao');
      const dados = sheet.getDataRange().getValues();
      const linha = dados.findIndex(row => row[0] === tipoDado);
      
      if (linha >= 0) {
        sheet.getRange(linha + 1, 2).setValue(dias);
        sheet.getRange(linha + 1, 3).setValue(new Date());
      } else {
        sheet.appendRow([tipoDado, dias, new Date()]);
      }
      return true;
    } catch (e) {
      console.error('Erro ao definir política de retenção', e);
      return false;
    }
  },

  /**
   * Obtém dias de retenção para um tipo
   */
  getRetencaoPorTipo: function(tipoDado) {
    try {
      const sheet = SheetsConnector.getSheet('politicas_retencao');
      const dados = sheet.getDataRange().getValues();
      const politica = dados.find(row => row[0] === tipoDado);
      return politica ? parseInt(politica[1]) : 365;
    } catch (e) {
      return 365;
    }
  }
};
