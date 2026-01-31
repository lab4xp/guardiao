// Geração de resumos diários/semanais

/**
 * Gera resumo diário de atividades
 * @return {Object} Resumo do dia
 */
function gerarResumoDiario() {
  // Define período (hoje)
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(amanha.getDate() + 1);
  // Busca atividades do dia
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LogAtividades');
  const dados = sheet.getDataRange().getValues();
  const atividadesHoje = dados.filter(row => {
    const data = new Date(row[0]);
    return data >= hoje && data < amanha;
  });
  // Retorna resumo
  return {
    data: hoje,
    totalAtividades: atividadesHoje.length,
    porTipo: contarPorTipo(atividadesHoje)
  };
}

/**
 * Envia resumo por email
 * @param {Object} resumo - Resumo a enviar
 * @param {Array} destinatarios - Lista de emails
 */
function enviarResumoPorEmail(resumo, destinatarios) {
  // Formata resumo como texto
  const corpo = `Resumo de ${resumo.data.toLocaleDateString()}\nTotal de atividades: ${resumo.totalAtividades}`;
  // Envia email para cada destinatário
  destinatarios.forEach(email => {
    MailApp.sendEmail(email, 'Resumo Diário - Guardião SEDF', corpo);
  });
}
