// Rastreamento de progresso de processamento

/**
 * Atualiza progresso de processamento
 * @param {string} tarefaId - ID da tarefa
 * @param {number} percentual - Percentual concluído (0-100)
 */
function atualizarProgresso(tarefaId, percentual) {
  // Acessa planilha de progresso
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progresso');
  // Busca tarefa
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === tarefaId) + 1;
  // Atualiza percentual
  if (linha > 0) {
    sheet.getRange(linha, 3).setValue(percentual);
    sheet.getRange(linha, 4).setValue(new Date());
  } else {
    // Cria novo registro
    sheet.appendRow([tarefaId, 'EM_ANDAMENTO', percentual, new Date()]);
  }
}

/**
 * Marca tarefa como concluída
 * @param {string} tarefaId - ID da tarefa
 */
function marcarTarefaConcluida(tarefaId) {
  // Atualiza para 100%
  atualizarProgresso(tarefaId, 100);
  // Atualiza status
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progresso');
  const dados = sheet.getDataRange().getValues();
  const linha = dados.findIndex(row => row[0] === tarefaId) + 1;
  sheet.getRange(linha, 2).setValue('CONCLUIDA');
}
