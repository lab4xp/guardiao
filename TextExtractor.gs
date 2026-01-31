/**
 * @fileoverview TextExtractor - Extração de Texto Nativa
 * Extrai conteúdo de documentos do Google Workspace e arquivos de texto.
 */

const TextExtractor = {
  
  /**
   * Extrai texto de um Google Doc
   */
  fromGoogleDoc: function(fileId) {
    try {
      const doc = DocumentApp.openById(fileId);
      return doc.getBody().getText();
    } catch (e) {
      console.error('Erro ao ler Google Doc: ' + fileId, e);
      return '';
    }
  },

  /**
   * Extrai texto de uma Planilha Google
   */
  fromGoogleSheet: function(fileId) {
    try {
      const ss = SpreadsheetApp.openById(fileId);
      const sheets = ss.getSheets();
      let fullText = '';
      sheets.forEach(sheet => {
        const values = sheet.getDataRange().getValues();
        fullText += values.map(row => row.join(' ')).join('\n') + '\n';
      });
      return fullText;
    } catch (e) {
      console.error('Erro ao ler Google Sheet: ' + fileId, e);
      return '';
    }
  }
};
