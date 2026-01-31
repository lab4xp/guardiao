/**
 * @fileoverview EsicIntegration - Integração com e-SIC / Ouvidoria
 */
const EsicIntegration = {
  
  /**
   * Envia solicitação para o e-SIC
   */
  enviarSolicitacao: function(solicitacao) {
    const protocolo = 'ESIC-' + new Date().getTime();
    
    const registro = {
      protocolo: protocolo,
      data: new Date(),
      assunto: solicitacao.assunto,
      descricao: solicitacao.descricao,
      status: 'ENVIADA',
      analisePrivacidade: PiiDetector.contemPII(solicitacao.descricao) ? 'RISCO_DETECTADO' : 'LIMPO'
    };

    try {
      SheetsConnector.inserir('solicitacoes_esic', registro);
      
      AuditLogger.registrar({
        tipo: 'INTEGRACAO_ESIC',
        dados: { protocolo: protocolo },
        status: 'SUCESSO'
      });
      
      return protocolo;
    } catch (e) {
      console.error('Erro e-SIC:', e);
      return null;
    }
  }
};
