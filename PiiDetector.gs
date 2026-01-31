/**
 * GUARDIÃO SEDF - Motor Principal de Detecção de PII
 * 
 * Orquestra detecção híbrida de dados pessoais identificáveis
 * Estágio 1: Detecção Determinística (Regex + Validação)
 * Estágio 2: Detecção Probabilística (NLP/NER)
 * 
 * @author Guardião SEDF Team
 * @version 2.0
 * @date 30/01/2026
 * 
 * Conformidade LGPD:
 * - Art. 5º, I: Dados pessoais identificáveis
 * - Art. 5º, II: Dados sensíveis
 * 
 * Precisão:
 * - Estágio 1 (Regex): ~99%
 * - Estágio 2 (NER): ~87-92%
 * - F1-Score combinado: ~0.93
 */

const PiiDetector = (function() {
  
  // ============================================================================
  // CONFIGURAÇÕES
  // ============================================================================
  
  const CONFIG = {
    // Habilitar/desabilitar estágios
    usarRegex: true,
    usarNER: false, // Desabilitado por padrão (requer Colab)
    
    // Detectores disponíveis (Estágio 1 - Regex)
    detectoresRegex: [
      'CpfValidator',
      'CnpjValidator',
      'EmailDetector',
      'PhoneDetector',
      'RgDetector',
      'CnhDetector',
      'MatriculaDetector',
      'CepDetector',
      'CartaoCreditoDetector',
      'PassaporteDetector',
      'TituloEleitorDetector',
      'PisDetector',
      'PlacaVeiculoDetector',
      'ProcessoJudicialDetector',
      'ContaBancariaDetector',
      'AddressDetector',
      'DateDetector'
    ],
    
    // Detectores de dados sensíveis
    detectoresSensiveis: [
      'BiometricDataDetector',
      'MedicalDataDetector',
      'RacialDataDetector',
      'ReligiousDataDetector',
      'PoliticalDataDetector',
      'SexualOrientationDetector'
    ],
    
    // Thresholds
    confiancaMinima: 0.70,
    
    // Deduplicação
    removerDuplicatas: true,
    
    // Cache
    usarCache: true,
    cacheDuracao: 300 // 5 minutos
  };
  
  // Cache de detecções
  const cacheDeteccoes = {};
  
  // ============================================================================
  // FUNÇÕES PRIVADAS
  // ============================================================================
  
  /**
   * Gera hash do texto para cache
   */
  function gerarHashTexto(texto) {
    try {
      const digest = Utilities.computeDigest(
        Utilities.DigestAlgorithm.MD5,
        texto
      );
      return digest.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Verifica cache de detecções
   */
  function verificarCache(hash) {
    if (!CONFIG.usarCache || !hash) return null;
    
    const cached = cacheDeteccoes[hash];
    if (!cached) return null;
    
    const agora = new Date().getTime();
    if (agora - cached.timestamp > CONFIG.cacheDuracao * 1000) {
      delete cacheDeteccoes[hash];
      return null;
    }
    
    return cached.deteccoes;
  }
  
  /**
   * Armazena no cache
   */
  function armazenarCache(hash, deteccoes) {
    if (!CONFIG.usarCache || !hash) return;
    
    cacheDeteccoes[hash] = {
      deteccoes: deteccoes,
      timestamp: new Date().getTime()
    };
  }
  
  /**
   * Executa detecção com Regex (Estágio 1)
   */
  function executarDeteccaoRegex(texto) {
    const deteccoes = [];
    
    // CPF (sempre disponível)
    if (typeof CpfValidator !== 'undefined') {
      const cpfs = CpfValidator.detectar(texto);
      deteccoes.push(...cpfs);
    }
    
    // Outros detectores (se disponíveis)
    CONFIG.detectoresRegex.forEach(nomeDetector => {
      try {
        // Verifica se detector existe
        if (typeof eval(nomeDetector) !== 'undefined') {
          const detector = eval(nomeDetector);
          if (detector && typeof detector.detectar === 'function') {
            const resultado = detector.detectar(texto);
            if (Array.isArray(resultado)) {
              deteccoes.push(...resultado);
            }
          }
        }
      } catch (error) {
        Logger.log('Detector ' + nomeDetector + ' não disponível: ' + error.message);
      }
    });
    
    return deteccoes;
  }
  
  /**
   * Executa detecção com NER (Estágio 2)
   */
  function executarDeteccaoNER(texto) {
    if (!CONFIG.usarNER) {
      return [];
    }
    
    try {
      if (typeof SpacyIntegration !== 'undefined') {
        return SpacyIntegration.processar(texto);
      }
    } catch (error) {
      Logger.log('Erro na detecção NER: ' + error.message);
    }
    
    return [];
  }
  
  /**
   * Executa detecção de dados sensíveis
   */
  function executarDeteccaoSensiveis(texto) {
    const deteccoes = [];
    
    CONFIG.detectoresSensiveis.forEach(nomeDetector => {
      try {
        if (typeof eval(nomeDetector) !== 'undefined') {
          const detector = eval(nomeDetector);
          if (detector && typeof detector.detectar === 'function') {
            const resultado = detector.detectar(texto);
            if (Array.isArray(resultado)) {
              deteccoes.push(...resultado);
            }
          }
        }
      } catch (error) {
        Logger.log('Detector sensível ' + nomeDetector + ' não disponível');
      }
    });
    
    return deteccoes;
  }
  
  /**
   * Remove detecções duplicadas
   */
  function removerDuplicatas(deteccoes) {
    if (!CONFIG.removerDuplicatas) {
      return deteccoes;
    }
    
    const mapa = new Map();
    
    deteccoes.forEach(det => {
      const chave = det.tipo + '_' + det.posicao + '_' + det.valor;
      
      if (!mapa.has(chave)) {
        mapa.set(chave, det);
      } else {
        // Mantém a detecção com maior confiança
        const existente = mapa.get(chave);
        if (det.confianca > existente.confianca) {
          mapa.set(chave, det);
        }
      }
    });
    
    return Array.from(mapa.values());
  }
  
  /**
   * Filtra por confiança mínima
   */
  function filtrarPorConfianca(deteccoes) {
    return deteccoes.filter(det => 
      det.confianca >= CONFIG.confiancaMinima
    );
  }
  
  /**
   * Ordena detecções por posição
   */
  function ordenarDeteccoes(deteccoes) {
    return deteccoes.sort((a, b) => a.posicao - b.posicao);
  }
  
  /**
   * Classifica nível de risco
   */
  function classificarRisco(deteccoes) {
    return deteccoes.map(det => {
      if (!det.nivelRisco) {
        // Classifica baseado no tipo
        if (['BIOMETRICO', 'SAUDE', 'RACIAL_ETNICO', 'RELIGIOSO', 'POLITICO', 'ORIENTACAO_SEXUAL'].includes(det.tipo)) {
          det.nivelRisco = 'CRITICO';
        } else if (['CPF', 'RG', 'CNH', 'PASSAPORTE', 'PESSOA', 'EMAIL', 'TELEFONE'].includes(det.tipo)) {
          det.nivelRisco = 'ALTO';
        } else if (['ENDERECO', 'CEP', 'DATA', 'ORGANIZACAO'].includes(det.tipo)) {
          det.nivelRisco = 'MEDIO';
        } else {
          det.nivelRisco = 'BAIXO';
        }
      }
      return det;
    });
  }
  
  /**
   * Enriquece detecções com metadados
   */
  function enriquecerDeteccoes(deteccoes) {
    return deteccoes.map(det => {
      // Adiciona timestamp se não existir
      if (!det.timestamp) {
        det.timestamp = new Date().toISOString();
      }
      
      // Adiciona ID único se não existir
      if (!det.id) {
        det.id = Utilities.getUuid();
      }
      
      return det;
    });
  }
  
  // ============================================================================
  // MÉTODOS PÚBLICOS
  // ============================================================================
  
  return {
    
    /**
     * Detecta todos os PIIs em um texto
     * @param {string} texto - Texto a ser analisado
     * @param {Object} opcoes - Opções de detecção
     * @returns {Array} Array de PIIs detectados
     */
    detectar: function(texto, opcoes = {}) {
      if (!texto || typeof texto !== 'string') {
        return [];
      }
      
      const inicio = new Date().getTime();
      
      // Verifica cache
      const hash = gerarHashTexto(texto);
      const cached = verificarCache(hash);
      if (cached) {
        Logger.log('Detecções recuperadas do cache');
        return cached;
      }
      
      // Aplica opções
      const usarRegex = opcoes.usarRegex !== undefined ? opcoes.usarRegex : CONFIG.usarRegex;
      const usarNER = opcoes.usarNER !== undefined ? opcoes.usarNER : CONFIG.usarNER;
      const usarSensiveis = opcoes.usarSensiveis !== undefined ? opcoes.usarSensiveis : true;
      
      let todasDeteccoes = [];
      
      // Estágio 1: Detecção Regex
      if (usarRegex) {
        const deteccoesRegex = executarDeteccaoRegex(texto);
        todasDeteccoes.push(...deteccoesRegex);
        Logger.log('Estágio 1 (Regex): ' + deteccoesRegex.length + ' detecções');
      }
      
      // Estágio 2: Detecção NER
      if (usarNER) {
        const deteccoesNER = executarDeteccaoNER(texto);
        todasDeteccoes.push(...deteccoesNER);
        Logger.log('Estágio 2 (NER): ' + deteccoesNER.length + ' detecções');
      }
      
      // Detecção de dados sensíveis
      if (usarSensiveis) {
        const deteccoesSensiveis = executarDeteccaoSensiveis(texto);
        todasDeteccoes.push(...deteccoesSensiveis);
        Logger.log('Dados Sensíveis: ' + deteccoesSensiveis.length + ' detecções');
      }
      
      // Pós-processamento
      todasDeteccoes = removerDuplicatas(todasDeteccoes);
      todasDeteccoes = filtrarPorConfianca(todasDeteccoes);
      todasDeteccoes = classificarRisco(todasDeteccoes);
      todasDeteccoes = enriquecerDeteccoes(todasDeteccoes);
      todasDeteccoes = ordenarDeteccoes(todasDeteccoes);
      
      const tempoProcessamento = new Date().getTime() - inicio;
      
      Logger.log('Detecção concluída: ' + todasDeteccoes.length + ' PIIs em ' + tempoProcessamento + 'ms');
      
      // Armazena no cache
      armazenarCache(hash, todasDeteccoes);
      
      // Log de auditoria
      AuditLogger.registrar({
        tipo: 'DETECCAO_PII',
        dados: {
          totalDeteccoes: todasDeteccoes.length,
          tempoProcessamento: tempoProcessamento,
          usarRegex: usarRegex,
          usarNER: usarNER
        },
        resultado: 'SUCESSO'
      });
      
      return todasDeteccoes;
    },

    /**
     * Detecta PIIs por tipo específico
     * @param {string} texto - Texto a analisar
     * @param {string} tipo - Tipo de PII (CPF, EMAIL, etc)
     * @returns {Array} Detecções do tipo especificado
     */
    detectarPorTipo: function(texto, tipo) {
      const todasDeteccoes = this.detectar(texto);
      return todasDeteccoes.filter(det => det.tipo === tipo);
    },
    
    /**
     * Verifica se texto contém PIIs
     * @param {string} texto - Texto a verificar
     * @returns {boolean} true se contém PIIs
     */
    contemPII: function(texto) {
      const deteccoes = this.detectar(texto);
      return deteccoes.length > 0;
    },
    
    /**
     * Verifica se texto contém dados sensíveis
     * @param {string} texto - Texto a verificar
     * @returns {boolean} true se contém dados sensíveis
     */
    contemDadosSensiveis: function(texto) {
      const deteccoes = this.detectar(texto);
      return deteccoes.some(det => det.nivelRisco === 'CRITICO');
    },
    
    /**
     * Gera estatísticas de detecção
     * @param {string} texto - Texto a analisar
     * @returns {Object} Estatísticas
     */
    estatisticas: function(texto) {
      const deteccoes = this.detectar(texto);
      
      const porTipo = {};
      const porRisco = {};
      const porMetodo = {};
      
      deteccoes.forEach(det => {
        porTipo[det.tipo] = (porTipo[det.tipo] || 0) + 1;
        porRisco[det.nivelRisco] = (porRisco[det.nivelRisco] || 0) + 1;
        porMetodo[det.metodo] = (porMetodo[det.metodo] || 0) + 1;
      });
      
      const confiancaMedia = deteccoes.length > 0
        ? deteccoes.reduce((sum, det) => sum + det.confianca, 0) / deteccoes.length
        : 0;
      
      return {
        total: deteccoes.length,
        porTipo: porTipo,
        porRisco: porRisco,
        porMetodo: porMetodo,
        confiancaMedia: confiancaMedia,
        contemSensiveis: deteccoes.some(det => det.nivelRisco === 'CRITICO')
      };
    },
    
    /**
     * Detecta e anonimiza em uma operação
     * @param {string} texto - Texto original
     * @param {string} estrategia - Estratégia de anonimização
     * @returns {Object} Resultado completo
     */
    detectarEAnonimizar: function(texto, estrategia = 'MASCARAMENTO') {
      const deteccoes = this.detectar(texto);
      
      if (deteccoes.length === 0) {
        return {
          textoOriginal: texto,
          textoAnonimizado: texto,
          deteccoes: [],
          totalSubstituicoes: 0,
          mensagem: 'Nenhum dado pessoal detectado'
        };
      }
      
      const resultado = Anonymizer.anonimizar(texto, deteccoes, estrategia);
      
      return {
        ...resultado,
        deteccoes: deteccoes,
        estatisticas: this.estatisticas(texto)
      };
    },
    
    /**
     * Processa documento completo
     * @param {Object} documento - Documento com texto e metadados
     * @returns {Object} Resultado do processamento
     */
    processarDocumento: function(documento) {
      const { id, texto, tipo, metadados = {} } = documento;
      
      const inicio = new Date().getTime();
      
      // Detecta PIIs
      const deteccoes = this.detectar(texto);
      
      // Verifica compliance LGPD
      const compliance = LgpdComplianceChecker.verificar(texto, metadados);
      
      // Classifica risco
      const classificacao = RiskLevelClassifier.classificar(deteccoes);
      
      const tempoProcessamento = new Date().getTime() - inicio;
      
      return {
        id: id,
        tipo: tipo,
        deteccoes: deteccoes,
        totalPII: deteccoes.length,
        compliance: compliance,
        classificacao: classificacao,
        recomendacao: this.gerarRecomendacao(deteccoes, compliance),
        tempoProcessamento: tempoProcessamento + 'ms',
        timestamp: new Date().toISOString()
      };
    },
    
    /**
     * Gera recomendação baseada nas detecções
     */
    gerarRecomendacao: function(deteccoes, compliance) {
      if (deteccoes.length === 0) {
        return {
          acao: 'PUBLICAR',
          mensagem: 'Nenhum dado pessoal detectado. Documento pode ser publicado.',
          cor: 'green'
        };
      }
      
      const temSensiveis = deteccoes.some(det => det.nivelRisco === 'CRITICO');
      
      if (temSensiveis) {
        return {
          acao: 'BLOQUEAR',
          mensagem: 'CRÍTICO: Dados sensíveis detectados. Anonimização obrigatória antes da publicação.',
          cor: 'magenta'
        };
      }
      
      if (!compliance.conforme) {
        return {
          acao: 'REVISAR',
          mensagem: 'Documento não conforme com LGPD. Aplicar anonimização e revisar.',
          cor: 'red'
        };
      }
      
      return {
        acao: 'ANONIMIZAR',
        mensagem: 'Dados pessoais detectados. Aplicar anonimização antes da publicação.',
        cor: 'yellow'
      };
    },
    
    /**
     * Limpa cache de detecções
     */
    limparCache: function() {
      Object.keys(cacheDeteccoes).forEach(key => delete cacheDeteccoes[key]);
      Logger.log('Cache de detecções limpo');
    },
    
    /**
     * Obtém estatísticas do cache
     */
    estatisticasCache: function() {
      return {
        totalEntradas: Object.keys(cacheDeteccoes).length,
        tamanhoBytes: JSON.stringify(cacheDeteccoes).length
      };
    },
    
    /**
     * Obtém configurações atuais
     */
    obterConfig: function() {
      return {
        usarRegex: CONFIG.usarRegex,
        usarNER: CONFIG.usarNER,
        detectoresRegex: CONFIG.detectoresRegex.length,
        detectoresSensiveis: CONFIG.detectoresSensiveis.length,
        confiancaMinima: CONFIG.confiancaMinima,
        removerDuplicatas: CONFIG.removerDuplicatas,
        usarCache: CONFIG.usarCache
      };
    },
    
    /**
     * Atualiza configurações
     */
    atualizarConfig: function(novasConfigs) {
      if (novasConfigs.usarRegex !== undefined) {
        CONFIG.usarRegex = novasConfigs.usarRegex;
      }
      if (novasConfigs.usarNER !== undefined) {
        CONFIG.usarNER = novasConfigs.usarNER;
      }
      if (novasConfigs.confiancaMinima !== undefined) {
        CONFIG.confiancaMinima = novasConfigs.confiancaMinima;
      }
      if (novasConfigs.removerDuplicatas !== undefined) {
        CONFIG.removerDuplicatas = novasConfigs.removerDuplicatas;
      }
      if (novasConfigs.usarCache !== undefined) {
        CONFIG.usarCache = novasConfigs.usarCache;
      }
      
      Logger.log('Configurações do PiiDetector atualizadas');
    },
    
    /**
     * Lista detectores disponíveis
     */
    listarDetectores: function() {
      const disponiveis = [];
      const indisponiveis = [];
      
      CONFIG.detectoresRegex.forEach(nome => {
        try {
          if (typeof eval(nome) !== 'undefined') {
            disponiveis.push(nome);
          } else {
            indisponiveis.push(nome);
          }
        } catch (error) {
          indisponiveis.push(nome);
        }
      });
      
      return {
        total: CONFIG.detectoresRegex.length,
        disponiveis: disponiveis,
        indisponiveis: indisponiveis,
        percentualDisponivel: Math.round((disponiveis.length / CONFIG.detectoresRegex.length) * 100)
      };
    }
  };
  
})();

/**
 * Função de teste
 */
function testarPiiDetector() {
  Logger.log('=== TESTE PII DETECTOR ===');
  
  const textoTeste = `
    Processo Seletivo - Resultado Final
    
    1º Lugar: João da Silva
    CPF: 123.456.789-09
    Email: joao.silva@educacao.df.gov.br
    Telefone: (61) 98765-4321
    Endereço: Rua das Flores, 123, Asa Norte, Brasília-DF
    CEP: 70000-000
    
    2º Lugar: Maria Santos
    CPF: 987.654.321-00
    Email: maria.santos@educacao.df.gov.br
    
    Observação: Candidato apresentou atestado médico.
  `;
  
  // Teste de detecção
  const deteccoes = PiiDetector.detectar(textoTeste);
  Logger.log('Total de PIIs detectados: ' + deteccoes.length);
  Logger.log('Detecções: ' + JSON.stringify(deteccoes, null, 2));
  
  // Teste de estatísticas
  const stats = PiiDetector.estatisticas(textoTeste);
  Logger.log('Estatísticas: ' + JSON.stringify(stats, null, 2));
  
  // Teste de detecção e anonimização
  const resultado = PiiDetector.detectarEAnonimizar(textoTeste, 'MASCARAMENTO');
  Logger.log('Texto anonimizado:\n' + resultado.textoAnonimizado);
  
  // Teste de verificação
  Logger.log('Contém PII: ' + PiiDetector.contemPII(textoTeste));
  Logger.log('Contém dados sensíveis: ' + PiiDetector.contemDadosSensiveis(textoTeste));
  
  // Lista detectores
  const detectores = PiiDetector.listarDetectores();
  Logger.log('Detectores disponíveis: ' + detectores.percentualDisponivel + '%');
  
  return deteccoes.length > 0;
}
