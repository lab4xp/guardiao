/**
 * @fileoverview DataSubjectRightsManager - Gestão de Direitos do Titular (Art. 18 LGPD)
 * Centraliza as operações de Acesso, Correção e Exclusão.
 */

const DataSubjectRightsManager = {
  
  /**
   * Processa solicitação de acesso aos dados (Art. 18, II)
   */
  processarSolicitacaoAcesso: function(cpf) {
    const cpfHash = MaskingStrategy.applyHash(cpf);
    
    const solicitacao = {
      tipo: 'ACESSO',
      titularHash: cpfHash,
      timestamp: new Date(),
      status: 'PROCESSADO'
    };

    // Auditoria da solicitação
    AuditLogger.registrar({
      tipo: 'LGPD_SOLICITACAO_DIREITO',
      dados: { tipo: 'ACESSO', titularHash: cpfHash },
      status: 'SUCESSO'
    });

    // Em cenário real, buscaria em múltiplas tabelas. Aqui buscamos no log de documentos processados.
    const docsSheet = SheetsConnector.getSheet('documentos');
    const docs = docsSheet.getDataRange().getValues().filter(row => row[1] === cpfHash);

    return {
      solicitacao: solicitacao,
      dadosEncontrados: {
        documentos: docs.length,
        registros: docs
      }
    };
  },

  /**
   * Solicita exclusão de dados (Direito ao Esquecimento - Art. 18, VI)
   */
  solicitarExclusao: function(cpf, justificativa) {
    const cpfHash = MaskingStrategy.applyHash(cpf);
    
    try {
      const sheet = SheetsConnector.getSheet('fila_exclusao');
      sheet.appendRow([
        new Date(),
        cpfHash,
        justificativa,
        'PENDENTE_DPO'
      ]);

      AuditLogger.registrar({
        tipo: 'LGPD_SOLICITACAO_DIREITO',
        dados: { tipo: 'EXCLUSAO', titularHash: cpfHash },
        status: 'SUCESSO'
      });

      return true;
    } catch (e) {
      console.error('Erro na solicitação de exclusão', e);
      return false;
    }
  }
};
