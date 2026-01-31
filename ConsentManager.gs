/**
 * @fileoverview ConsentManager - Gerenciamento de Consentimento de Titulares
 * Controla a base legal (Art. 7º, I) para tratamento de dados.
 */

const ConsentManager = {

  /**
   * Registra consentimento de uso de dados
   */
  registrarConsentimento: function(cpf, finalidade, consentiu) {
    const cpfHash = MaskingStrategy.applyHash(cpf);
    
    try {
      const sheet = SheetsConnector.getSheet('consentimentos');
      sheet.appendRow([
        new Date(),
        cpfHash,
        finalidade,
        consentiu ? 'SIM' : 'NAO',
        Session.getActiveUser().getEmail()
      ]);

      AuditLogger.registrar({
        tipo: 'CONSENTIMENTO_REGISTRADO',
        dados: { finalidade: finalidade, status: consentiu },
        status: 'SUCESSO'
      });
      
      return true;
    } catch (e) {
      console.error('Erro ao registrar consentimento', e);
      return false;
    }
  },

  /**
   * Verifica se há consentimento válido
   */
  verificarConsentimento: function(cpf, finalidade) {
    const cpfHash = MaskingStrategy.applyHash(cpf);
    
    try {
      const sheet = SheetsConnector.getSheet('consentimentos');
      const dados = sheet.getDataRange().getValues();
      
      // Busca consentimento mais recente para o par CPF/Finalidade
      for (let i = dados.length - 1; i >= 1; i--) {
        if (dados[i][1] === cpfHash && dados[i][2] === finalidade) {
          return dados[i][3] === 'SIM';
        }
      }
    } catch (e) {
      console.error('Erro ao verificar consentimento', e);
    }
    return false;
  }
};
