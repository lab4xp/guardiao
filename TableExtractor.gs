// Extração de tabelas de documentos

/**
 * Extrai tabelas de um documento
 * @param {string} docId - ID do documento
 * @return {Array} Tabelas extraídas
 */
function extrairTabelas(docId) {
  // Abre documento do Google Docs
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();
  // Obtém todas as tabelas
  const tabelas = [];
  const numTabelas = body.getNumChildren();
  for (let i = 0; i < numTabelas; i++) {
    const elemento = body.getChild(i);
    if (elemento.getType() === DocumentApp.ElementType.TABLE) {
      tabelas.push(extrairDadosTabela(elemento.asTable()));
    }
  }
  return tabelas;
}

/**
 * Extrai dados de uma tabela
 * @param {Table} tabela - Tabela do documento
 * @return {Array} Dados da tabela
 */
function extrairDadosTabela(tabela) {
  // Extrai dados de cada célula
  const dados = [];
  for (let i = 0; i < tabela.getNumRows(); i++) {
    const linha = [];
    const row = tabela.getRow(i);
    for (let j = 0; j < row.getNumCells(); j++) {
      linha.push(row.getCell(j).getText());
    }
    dados.push(linha);
  }
  return dados;
}
