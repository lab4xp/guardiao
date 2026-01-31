/**
 * GUARDIÃO SEDF - REST Controller
 * 
 * Implementa endpoints REST para API do sistema
 * Funções doGet() e doPost() são pontos de entrada do Google Apps Script Web App
 * 
 * @author Guardião SEDF Team
 * @version 2.0
 * @date 30/01/2026
 * 
 * Endpoints disponíveis:
 * - GET  /api/health          - Status do sistema
 * - GET  /api/version         - Versão do sistema
 * - POST /api/detectar        - Detecta PII em texto
 * - POST /api/anonimizar      - Anonimiza texto
 * - POST /api/validar         - Valida documento
 * - GET  /api/resultados/:id  - Busca resultado por ID
 * - POST /api/batch           - Processamento em lote
 * - GET  /api/auditoria       - Logs de auditoria
 */

/**
 * Manipula requisições HTTP GET
 * Ponto de entrada para Web App
 * 
 * @param {Object} e - Evento da requisição
 * @returns {HtmlOutput|TextOutput} Resposta HTTP
 */
function doGet(e) {
  try {
    // Log da requisição
    AuditLogger.registrar({
      tipo: 'API_REQUEST',
      metodo: 'GET',
      parametros: e.parameter,
      usuario: Session.getActiveUser().getEmail(),
      timestamp: new Date()
    });
    
    // Extrai rota e parâmetros
    const rota = e.parameter.rota || 'index';
    const params = e.parameter;
    
    // Roteamento
    switch (rota) {
      case 'index':
        return renderizarIndex();
      
      case 'health':
        return responderJSON(verificarSaude());
      
      case 'version':
        return responderJSON(obterVersao());
      
      case 'resultados':
        return responderJSON(buscarResultados(params));
      
      case 'auditoria':
        return responderJSON(buscarAuditoria(params));
      
      case 'dashboard':
        return renderizarDashboard();
      
      case 'docs':
        return renderizarDocumentacao();
      
      default:
        return responderErro(404, 'Rota não encontrada: ' + rota);
    }
    
  } catch (error) {
    Logger.log('Erro em doGet: ' + error.message);
    return responderErro(500, 'Erro interno do servidor', error);
  }
}

/**
 * Manipula requisições HTTP POST
 * Ponto de entrada para operações de escrita
 * 
 * @param {Object} e - Evento da requisição
 * @returns {TextOutput} Resposta JSON
 */
function doPost(e) {
  try {
    // Log da requisição
    AuditLogger.registrar({
      tipo: 'API_REQUEST',
      metodo: 'POST',
      usuario: Session.getActiveUser().getEmail(),
      timestamp: new Date()
    });
    
    // Parse do corpo da requisição
    let dados;
    try {
      dados = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return responderErro(400, 'JSON inválido', parseError);
    }
    
    // Extrai rota
    const rota = e.parameter.rota || dados.rota;
    
    // Validação de autenticação
    if (!validarAutenticacao(e)) {
      return responderErro(401, 'Não autorizado');
    }
    
    // Roteamento
    switch (rota) {
      case 'detectar':
        return responderJSON(detectarPII(dados));
      
      case 'anonimizar':
        return responderJSON(anonimizarTexto(dados));
      
      case 'validar':
        return responderJSON(validarDocumento(dados));
      
      case 'batch':
        return responderJSON(processarLote(dados));
      
      case 'aprovar':
        return responderJSON(aprovarResultado(dados));
      
      case 'rejeitar':
        return responderJSON(rejeitarResultado(dados));
      
      case 'exportar':
        return responderJSON(exportarDados(dados));
      
      case 'feedback':
        return responderJSON(registrarFeedback(dados));
      
      default:
        return responderErro(404, 'Rota não encontrada: ' + rota);
    }
    
  } catch (error) {
    Logger.log('Erro em doPost: ' + error.message);
    return responderErro(500, 'Erro interno do servidor', error);
  }
}

// ============================================================================
// FUNÇÕES DE ROTEAMENTO GET
// ============================================================================

/**
 * Renderiza página inicial
 */
function renderizarIndex() {
  const template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate()
    .setTitle('Guardião SEDF')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Renderiza dashboard
 */
function renderizarDashboard() {
  const template = HtmlService.createTemplateFromFile('MainDashboard');
  return template.evaluate()
    .setTitle('Dashboard - Guardião SEDF')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Renderiza documentação da API
 */
function renderizarDocumentacao() {
  const docs = {
    sistema: Config.getSistema(),
    endpoints: {
      get: [
        { rota: '/api/health', descricao: 'Status do sistema' },
        { rota: '/api/version', descricao: 'Versão do sistema' },
        { rota: '/api/resultados', descricao: 'Buscar resultados' },
        { rota: '/api/auditoria', descricao: 'Logs de auditoria' }
      ],
      post: [
        { rota: '/api/detectar', descricao: 'Detectar PII em texto' },
        { rota: '/api/anonimizar', descricao: 'Anonimizar texto' },
        { rota: '/api/validar', descricao: 'Validar documento' },
        { rota: '/api/batch', descricao: 'Processamento em lote' }
      ]
    },
    exemplos: {
      detectar: {
        metodo: 'POST',
        url: '/api/detectar',
        body: {
          texto: 'João da Silva, CPF 123.456.789-09',
          opcoes: { incluirContexto: true }
        }
      }
    }
  };
  
  const template = HtmlService.createTemplate(
    '<pre><?= JSON.stringify(docs, null, 2) ?></pre>'
  );
  template.docs = docs;
  
  return template.evaluate()
    .setTitle('API Docs - Guardião SEDF');
}

/**
 * Verifica saúde do sistema
 */
function verificarSaude() {
  const inicio = new Date().getTime();
  
  try {
    // Testa conexão com Sheets
    const sheetsOk = testarSheets();
    
    // Testa cache
    const cacheOk = testarCache();
    
    // Testa Colab (opcional)
    let colabOk = false;
    try {
      colabOk = ColabConnector.testarConexao().sucesso;
    } catch (e) {
      colabOk = false;
    }
    
    const tempoResposta = new Date().getTime() - inicio;
    
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      versao: Config.getSistema().versao,
      componentes: {
        sheets: sheetsOk ? 'OK' : 'ERRO',
        cache: cacheOk ? 'OK' : 'ERRO',
        colab: colabOk ? 'OK' : 'OFFLINE'
      },
      tempoResposta: tempoResposta + 'ms',
      uptime: Session.getScriptTimeZone()
    };
  } catch (error) {
    return {
      status: 'ERRO',
      timestamp: new Date().toISOString(),
      erro: error.message
    };
  }
}

/**
 * Obtém versão do sistema
 */
function obterVersao() {
  return Config.getVersao();
}

/**
 * Busca resultados de processamento
 */
function buscarResultados(params) {
  const id = params.id;
  const limite = parseInt(params.limite) || 10;
  const offset = parseInt(params.offset) || 0;
  
  if (id) {
    // Busca resultado específico
    return SheetsConnector.buscarPorId('ResultadosDeteccao', id);
  } else {
    // Lista resultados
    return SheetsConnector.listar('ResultadosDeteccao', { limite, offset });
  }
}

/**
 * Busca logs de auditoria
 */
function buscarAuditoria(params) {
  const dataInicio = params.dataInicio;
  const dataFim = params.dataFim;
  const tipo = params.tipo;
  const limite = parseInt(params.limite) || 50;
  
  return AuditLogger.buscar({
    dataInicio,
    dataFim,
    tipo,
    limite
  });
}

// ============================================================================
// FUNÇÕES DE ROTEAMENTO POST
// ============================================================================

/**
 * Detecta PII em texto
 */
function detectarPII(dados) {
  const { texto, opcoes = {} } = dados;
  
  if (!texto) {
    throw new Error('Parâmetro "texto" é obrigatório');
  }
  
  const inicio = new Date().getTime();
  
  // Detecção híbrida (Regex + NER)
  const resultadosRegex = executarDeteccaoRegex(texto);
  const resultadosNER = opcoes.usarNER ? executarDeteccaoNER(texto) : [];
  
  // Fusão de resultados
  const resultadosFundidos = SpanMerger.fundir(resultadosRegex, resultadosNER);
  
  // Classificação de risco
  const classificacao = RiskLevelClassifier.classificar(resultadosFundidos);
  
  const tempoProcessamento = new Date().getTime() - inicio;
  
  // Salva resultado
  const idResultado = SheetsConnector.inserir('ResultadosDeteccao', {
    timestamp: new Date().toISOString(),
    texto: texto.substring(0, 1000), // Primeiros 1000 caracteres
    totalPII: resultadosFundidos.length,
    classificacao: classificacao,
    dados: JSON.stringify(resultadosFundidos),
    tempoProcessamento: tempoProcessamento
  });
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'DETECCAO_PII',
    idResultado: idResultado,
    totalPII: resultadosFundidos.length,
    classificacao: classificacao,
    usuario: Session.getActiveUser().getEmail()
  });
  
  return {
    sucesso: true,
    idResultado: idResultado,
    totalPII: resultadosFundidos.length,
    classificacao: classificacao,
    deteccoes: resultadosFundidos,
    metricas: {
      tempoProcessamento: tempoProcessamento + 'ms',
      metodosUsados: opcoes.usarNER ? ['Regex', 'NER'] : ['Regex']
    }
  };
}

/**
 * Anonimiza texto
 */
function anonimizarTexto(dados) {
  const { texto, estrategia = 'PARCIAL', idResultado } = dados;
  
  if (!texto) {
    throw new Error('Parâmetro "texto" é obrigatório');
  }
  
  const inicio = new Date().getTime();
  
  // Detecta PII primeiro
  const deteccoes = executarDeteccaoRegex(texto);
  
  // Aplica anonimização
  const resultado = Anonymizer.anonimizar(texto, deteccoes, estrategia);
  
  const tempoProcessamento = new Date().getTime() - inicio;
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'ANONIMIZACAO',
    idResultado: idResultado,
    estrategia: estrategia,
    totalSubstituicoes: resultado.substituicoes.length,
    usuario: Session.getActiveUser().getEmail()
  });
  
  return {
    sucesso: true,
    textoOriginal: texto,
    textoAnonimizado: resultado.textoAnonimizado,
    totalSubstituicoes: resultado.substituicoes.length,
    substituicoes: resultado.substituicoes,
    estrategia: estrategia,
    tempoProcessamento: tempoProcessamento + 'ms'
  };
}

/**
 * Valida documento
 */
function validarDocumento(dados) {
  const { idDocumento, texto, tipo } = dados;
  
  // Validação de compliance LGPD
  const compliance = LgpdComplianceChecker.verificar(texto);
  
  // Detecção de dados sensíveis
  const dadosSensiveis = SensitiveDataClassifier.classificar(texto);
  
  return {
    sucesso: true,
    idDocumento: idDocumento,
    compliance: compliance,
    dadosSensiveis: dadosSensiveis,
    recomendacao: compliance.conforme ? 'APROVAR' : 'REVISAR'
  };
}

/**
 * Processa lote de documentos
 */
function processarLote(dados) {
  const { documentos, opcoes = {} } = dados;
  
  if (!documentos || !Array.isArray(documentos)) {
    throw new Error('Parâmetro "documentos" deve ser um array');
  }
  
  const inicio = new Date().getTime();
  const resultados = [];
  
  // Processa cada documento
  documentos.forEach((doc, index) => {
    try {
      const resultado = detectarPII({
        texto: doc.texto,
        opcoes: opcoes
      });
      
      resultados.push({
        index: index,
        id: doc.id,
        sucesso: true,
        resultado: resultado
      });
    } catch (error) {
      resultados.push({
        index: index,
        id: doc.id,
        sucesso: false,
        erro: error.message
      });
    }
  });
  
  const tempoTotal = new Date().getTime() - inicio;
  const sucessos = resultados.filter(r => r.sucesso).length;
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'PROCESSAMENTO_LOTE',
    totalDocumentos: documentos.length,
    sucessos: sucessos,
    falhas: documentos.length - sucessos,
    tempoTotal: tempoTotal,
    usuario: Session.getActiveUser().getEmail()
  });
  
  return {
    sucesso: true,
    totalDocumentos: documentos.length,
    processados: sucessos,
    falhas: documentos.length - sucessos,
    resultados: resultados,
    tempoTotal: tempoTotal + 'ms',
    tempoMedio: Math.round(tempoTotal / documentos.length) + 'ms'
  };
}

/**
 * Aprova resultado (Human-in-the-Loop)
 */
function aprovarResultado(dados) {
  const { idResultado, comentario } = dados;
  
  if (!idResultado) {
    throw new Error('Parâmetro "idResultado" é obrigatório');
  }
  
  // Atualiza status
  SheetsConnector.atualizar('ResultadosDeteccao', idResultado, {
    status: 'APROVADO',
    aprovadoPor: Session.getActiveUser().getEmail(),
    dataAprovacao: new Date().toISOString(),
    comentario: comentario
  });
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'APROVACAO_RESULTADO',
    idResultado: idResultado,
    usuario: Session.getActiveUser().getEmail(),
    comentario: comentario
  });
  
  return {
    sucesso: true,
    idResultado: idResultado,
    status: 'APROVADO',
    mensagem: 'Resultado aprovado com sucesso'
  };
}

/**
 * Rejeita resultado (Human-in-the-Loop)
 */
function rejeitarResultado(dados) {
  const { idResultado, motivo } = dados;
  
  if (!idResultado) {
    throw new Error('Parâmetro "idResultado" é obrigatório');
  }
  
  // Atualiza status
  SheetsConnector.atualizar('ResultadosDeteccao', idResultado, {
    status: 'REJEITADO',
    rejeitadoPor: Session.getActiveUser().getEmail(),
    dataRejeicao: new Date().toISOString(),
    motivo: motivo
  });
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'REJEICAO_RESULTADO',
    idResultado: idResultado,
    usuario: Session.getActiveUser().getEmail(),
    motivo: motivo
  });
  
  return {
    sucesso: true,
    idResultado: idResultado,
    status: 'REJEITADO',
    mensagem: 'Resultado rejeitado'
  };
}

/**
 * Exporta dados
 */
function exportarDados(dados) {
  const { tipo, formato = 'JSON', filtros = {} } = dados;
  
  let dadosExportacao;
  
  switch (tipo) {
    case 'resultados':
      dadosExportacao = SheetsConnector.listar('ResultadosDeteccao', filtros);
      break;
    
    case 'auditoria':
      dadosExportacao = AuditLogger.buscar(filtros);
      break;
    
    case 'relatorio':
      dadosExportacao = ComplianceReporter.gerar(filtros);
      break;
    
    default:
      throw new Error('Tipo de exportação inválido: ' + tipo);
  }
  
  // Log de auditoria
  AuditLogger.registrar({
    tipo: 'EXPORTACAO',
    tipoExportacao: tipo,
    formato: formato,
    totalRegistros: dadosExportacao.length,
    usuario: Session.getActiveUser().getEmail()
  });
  
  return {
    sucesso: true,
    tipo: tipo,
    formato: formato,
    totalRegistros: dadosExportacao.length,
    dados: dadosExportacao,
    timestamp: new Date().toISOString()
  };
}

/**
 * Registra feedback do usuário
 */
function registrarFeedback(dados) {
  const { idResultado, tipo, comentario, falsoPositivo, falsoNegativo } = dados;
  
  // Salva feedback
  const idFeedback = SheetsConnector.inserir('Feedback', {
    idResultado: idResultado,
    tipo: tipo,
    comentario: comentario,
    falsoPositivo: falsoPositivo || false,
    falsoNegativo: falsoNegativo || false,
    usuario: Session.getActiveUser().getEmail(),
    timestamp: new Date().toISOString()
  });
  
  // Se for falso positivo/negativo, atualiza modelo
  if (falsoPositivo || falsoNegativo) {
    FeedbackCollector.processar({
      idFeedback: idFeedback,
      tipo: falsoPositivo ? 'FALSO_POSITIVO' : 'FALSO_NEGATIVO',
      dados: dados
    });
  }
  
  return {
    sucesso: true,
    idFeedback: idFeedback,
    mensagem: 'Feedback registrado com sucesso'
  };
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Executa detecção usando Regex
 */
function executarDeteccaoRegex(texto) {
  const detectores = [
    CpfValidator,
    // Outros detectores serão adicionados
  ];
  
  const resultados = [];
  
  detectores.forEach(detector => {
    if (detector && typeof detector.detectar === 'function') {
      const deteccoes = detector.detectar(texto);
      resultados.push(...deteccoes);
    }
  });
  
  return resultados;
}

/**
 * Executa detecção usando NER
 */
function executarDeteccaoNER(texto) {
  try {
    return SpacyIntegration.processar(texto);
  } catch (error) {
    Logger.log('Erro ao executar NER: ' + error.message);
    return [];
  }
}

/**
 * Valida autenticação da requisição
 */
function validarAutenticacao(e) {
  // Verifica se usuário está autenticado
  const email = Session.getActiveUser().getEmail();
  
  if (!email) {
    return false;
  }
  
  // Verifica permissões
  return PermissionChecker.temPermissao(email, 'API_ACCESS');
}

/**
 * Testa conexão com Sheets
 */
function testarSheets() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    return ss !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Testa cache
 */
function testarCache() {
  try {
    const cache = CacheService.getScriptCache();
    cache.put('test', 'ok', 10);
    const valor = cache.get('test');
    return valor === 'ok';
  } catch (error) {
    return false;
  }
}

/**
 * Responde com JSON
 */
function responderJSON(dados) {
  const output = ContentService.createTextOutput(
    JSON.stringify(dados, null, 2)
  );
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Headers CORS
  return output;
}

/**
 * Responde com erro
 */
function responderErro(codigo, mensagem, erro = null) {
  const resposta = {
    sucesso: false,
    erro: {
      codigo: codigo,
      mensagem: mensagem
    },
    timestamp: new Date().toISOString()
  };
  
  if (erro && erro.message) {
    resposta.erro.detalhes = erro.message;
    resposta.erro.stack = erro.stack;
  }
  
  // Log do erro
  Logger.log('ERRO ' + codigo + ': ' + mensagem);
  if (erro) {
    Logger.log(erro.stack);
  }
  
  return responderJSON(resposta);
}

/**
 * Inclui arquivo HTML (helper para templates)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ============================================================================
// FUNÇÕES DE TESTE
// ============================================================================

/**
 * Testa endpoints da API
 */
function testarRestController() {
  Logger.log('=== TESTE REST CONTROLLER ===');
  
  // Simula requisição GET /health
  const healthResponse = verificarSaude();
  Logger.log('Health Check: ' + JSON.stringify(healthResponse, null, 2));
  
  // Simula requisição POST /detectar
  const detectarResponse = detectarPII({
    texto: 'João da Silva, CPF 123.456.789-09, email: joao@example.com',
    opcoes: { usarNER: false }
  });
  Logger.log('Detectar PII: ' + JSON.stringify(detectarResponse, null, 2));
  
  // Simula requisição POST /anonimizar
  const anonimizarResponse = anonimizarTexto({
    texto: 'João da Silva, CPF 123.456.789-09',
    estrategia: 'PARCIAL'
  });
  Logger.log('Anonimizar: ' + JSON.stringify(anonimizarResponse, null, 2));
  
  return {
    health: healthResponse.status === 'OK',
    detectar: detectarResponse.sucesso,
    anonimizar: anonimizarResponse.sucesso
  };
}

/**
 * Obtém URL do Web App implantado
 */
function obterUrlWebApp() {
  const url = ScriptApp.getService().getUrl();
  Logger.log('URL do Web App: ' + url);
  return url;
}
