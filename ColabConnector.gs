/**
 * @fileoverview ColabConnector - Conexão com o Motor de IA Externo (Python/spaCy)
 * Gerencia chamadas UrlFetch para o adaptador semântico.
 */

const ColabConnector = {
  
  /**
   * Obtém a URL do endpoint de IA das configurações
   * @private
   */
  getApiUrl: function() {
    // Tenta buscar da planilha ConfigAPI (Coluna B da primeira linha de dados)
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName('ConfigAPI');
      if (sheet) {
        return sheet.getRange(2, 1).getValue(); // Assume Coluna A, Linha 2
      }
    } catch (e) {
      console.warn('Usando URL fallback para IA');
    }
    return Config.getColab().urlPadrao;
  },

  /**
   * Envia texto para processamento NER na IA
   * @param {string} texto - Conteúdo a analisar
   * @return {Array} Entidades detectadas pela IA
   */
  fetchNer: function(texto) {
    const url = this.getApiUrl() + '/api/ner';
    
    const payload = {
      texto: texto,
      modelo: 'pt_core_news_lg'
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      headers: {
        'Accept': 'application/json'
      }
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const statusCode = response.getResponseCode();
      const content = response.getContentText();

      if (statusCode === 200) {
        return JSON.parse(content).entidades || [];
      } else {
        console.error('IA Offline ou Erro: ' + statusCode, content);
        return [];
      }
    } catch (e) {
      console.error('Falha de conexão com IA Colab: ' + e);
      return [];
    }
  },

  /**
   * Testa a conectividade com o adaptador semântico
   */
  testarConexao: function() {
    try {
      const url = this.getApiUrl() + '/health';
      const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      return {
        sucesso: response.getResponseCode() === 200,
        detalhes: response.getContentText()
      };
    } catch (e) {
      return { sucesso: false, erro: e.toString() };
    }
  }
};
