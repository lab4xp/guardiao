/**
 * @fileoverview BatchProcessor - Otimização de Escrita em Lote
 * Reduz o número de chamadas de API ao consolidar múltiplas escritas.
 */

const BatchProcessor = {
  
  /**
   * Salva um grande conjunto de dados em uma única transação
   * @param {string} tabela
   * @param {Array<Object>} listaDados
   */
  salvarEmLote: function(tabela, listaDados) {
    if (!listaDados || listaDados.length === 0) return 0;
    
    // Assegura que listaDados seja array de objetos
    if (!Array.isArray(listaDados)) {
        console.error('BatchProcessor: dados inválidos (esperado array)');
        return 0;
    }

    try {
      const sheet = SheetsConnector.getSheet(tabela);
      // Pega headers. Se falhar ou tabela vazia, tenta deduzir do primeiro objeto (MVP)
      let headers = [];
      if (sheet.getLastColumn() > 0) {
        headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      }
      
      // Auto-header (se planilha vazia)
      if (headers.length === 0 && listaDados.length > 0) {
        headers = Object.keys(listaDados[0]);
        sheet.appendRow(headers); // Cria cabeçalho
      }

      const rows = listaDados.map(dados => {
        return headers.map(h => {
          const val = dados[h];
          // Formata objetos/arrays para JSON string antes de salvar
          // Trata também dates se necessário
          if (val instanceof Date) return val;
          return (typeof val === 'object' && val !== null) ? JSON.stringify(val) : (val === undefined ? '' : val);
        });
      });

      // Calcula range de destino começando na próxima linha vazia
      if (rows.length > 0) {
        const startRow = Math.max(sheet.getLastRow() + 1, 2); // Garante que não sobrescreva header na linha 1
        sheet.getRange(startRow, 1, rows.length, headers.length).setValues(rows);
      }
      
      return rows.length;
    } catch (e) {
      console.error('Erro no BatchProcessor.salvarEmLote: ' + e.message);
      return 0;
    }
  }
};
