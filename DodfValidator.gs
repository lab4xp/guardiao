// Validação de conformidade de publicações DODF

/**
 * Valida se publicação está conforme LGPD
 * @param {string} textoPublicacao - Texto da publicação
 * @return {Object} Resultado da validação
 */
function validarConformidadeDodf(textoPublicacao) {
  // Detecta dados pessoais sensíveis
  const cpfs = detectarCpfs(textoPublicacao);
  const emails = detectarEmails(textoPublicacao);
  const telefones = detectarTelefones(textoPublicacao);
  // Verifica se há dados que não deveriam estar públicos
  const problemas = [];
  if (cpfs.length > 0) problemas.push('CPFs detectados');
  if (emails.length > 0) problemas.push('Emails detectados');
  if (telefones.length > 0) problemas.push('Telefones detectados');
  // Retorna resultado
  return {
    conforme: problemas.length === 0,
    problemas: problemas
  };
}

/**
 * Marca publicação como não conforme
 * @param {string} publicacaoId - ID da publicação
 * @param {Array} problemas - Lista de problemas encontrados
 */
function marcarNaoConforme(publicacaoId, problemas) {
  // Registra na planilha de não conformidades
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('NaoConformidades');
  sheet.appendRow([new Date(), publicacaoId, problemas.join(', '), 'PENDENTE']);
}
