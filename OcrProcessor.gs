/**
 * @fileoverview OcrProcessor - Processamento OCR via Google Drive API
 * Converte imagens e PDFs rasterizados em texto legível.
 */

const OcrProcessor = {
  
  /**
   * Realiza OCR em um arquivo do Drive
   * @param {string} fileId - ID do arquivo original
   * @return {string} Texto extraído ou string vazia
   */
  process: function(fileId) {
    try {
      const file = DriveApp.getFileById(fileId);
      const blob = file.getBlob();
      
      // Configuração para o Drive API v2
      // 'ocr': true força o reconhecimento de caracteres durante a cópia
      const resource = {
        title: 'OCR_TEMP_' + file.getName(),
        mimeType: blob.getContentType()
      };
      
      // Cria uma cópia como Google Doc (isso dispara o OCR)
      const tempDoc = Drive.Files.insert(resource, blob, { ocr: true });
      
      // Abre o documento temporário para ler o texto
      const doc = DocumentApp.openById(tempDoc.id);
      const text = doc.getBody().getText();
      
      // Remove o arquivo temporário imediatamente
      DriveApp.getFileById(tempDoc.id).setTrashed(true);
      
      return text;
    } catch (e) {
      console.error('Falha no OCR para o arquivo: ' + fileId, e);
      return '';
    }
  }
};
