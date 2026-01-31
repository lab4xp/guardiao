/**
 * @fileoverview SheetsConnector - Conector Base do Backend
 * Gerencia o acesso persistente ao Google Sheets, servindo como nossa camada DAO.
 */

const SheetsConnector = {
  
  /**
   * Obtém uma planilha pelo nome definido nas configurações
   * @param {string} tabName - Nome da tabela (ex: 'documentos')
   */
  getSheet: function(tabName) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = Config.getSheets().tabelas[tabName] || tabName;
    let sheet = ss.getSheetByName(sheetName);
    
    // Auto-criação da tabela se não existir (conveniente para MVP)
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      console.warn('Criando tabela inexistente: ' + sheetName);
    }
    return sheet;
  },

  /**
   * Insere um registro (Single Row)
   */
  inserir: function(tabela, dados) {
    const sheet = this.getSheet(tabela);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
    const row = headers.map(h => dados[h] || '');
    
    sheet.appendRow(row);
    return true;
  },

  /**
   * Busca registros (Simulação de SELECT)
   */
  listar: function(tabela, limites = { limite: 100, offset: 0 }) {
    const sheet = this.getSheet(tabela);
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    return values.slice(limites.offset, limites.offset + limites.limite).map(row => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
  }
};