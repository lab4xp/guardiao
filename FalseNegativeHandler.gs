// Tratamento de falsos negativos

/**
 * Registra falso negativo para treinamento
 * @param {string} texto - Texto onde PII não foi detectado
 * @param {string} tipoPii - Tipo de PII não detectado
 */
function registrarFalsoNegativo(texto, tipoPii) {
  // Acessa planilha de falsos negativos
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FalsosNegativos');
  // Adiciona registro para análise
  sheet.appendRow([
    new Date(),
    texto,
    tipoPii,
    Session.getActiveUser().getEmail(),
    'PENDENTE'
  ]);
}

/**
 * Processa falsos negativos para melhorar modelo
 */
function processarFalsosNegativos() {
  // Busca falsos negativos pendentes
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FalsosNegativos');
  const dados = sheet.getDataRange().getValues();
  const pendentes = dados.filter(row => row[4] === 'PENDENTE');
  // Adiciona padrões ao sistema
  pendentes.forEach((row, index) => {
    adicionarPadraoCustomizado(row[2], row[1]);
    sheet.getRange(index + 1, 5).setValue('PROCESSADO');
  });
}
