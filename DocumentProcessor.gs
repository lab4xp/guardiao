/**
 * @fileoverview DocumentProcessor - Orquestrador de Processamento de Arquivos
 * Decide o método de extração adequado baseado no MimeType do arquivo.
 */

const DocumentProcessor = {
  
  /**
   * Processa um arquivo do Drive e retorna seus dados PII detectados
   * @param {string} fileId
   */
  processFileById: function(fileId) {
    const file = DriveApp.getFileById(fileId);
    const mimeType = file.getMimeType();
    let text = '';

    console.log(`Processando arquivo: ${file.getName()} (${mimeType})`);

    // 1. Extração de Texto
    if (mimeType === MimeType.GOOGLE_DOCS) {
      text = TextExtractor.fromGoogleDoc(fileId);
    } 
    else if (mimeType === MimeType.GOOGLE_SHEETS) {
      text = TextExtractor.fromGoogleSheet(fileId);
    }
    else if (mimeType === MimeType.PDF || mimeType.startsWith('image/')) {
      // Uso de OCR para PDFs e Imagens
      text = OcrProcessor.process(fileId);
    }
    else if (mimeType === MimeType.PLAIN_TEXT) {
      text = file.getBlob().getDataAsString();
    }
    else {
      // Tenta OCR como fallback para outros tipos editáveis
      text = OcrProcessor.process(fileId);
    }

    if (!text) throw new Error('Não foi possível extrair texto do documento.');

    // 2. Detecção de PII (Integrando Etapas anteriores)
    const deteccoes = PiiDetector.detectar(text, { usarNER: true });
    
    // 3. Persistência de Auditoria
    const recordId = SheetsConnector.inserir('documentos', {
      timestamp: new Date(),
      nome_arquivo: file.getName(),
      fileId: fileId,
      status: PROCESS_STATUS.COMPLETED,
      total_pii: deteccoes.length,
      usuario: Session.getActiveUser().getEmail()
    });

    return {
      id: fileId,
      nome: file.getName(),
      texto: text,
      deteccoes: deteccoes,
      summary: PiiDetector.estatisticas(text)
    };
  }
};
