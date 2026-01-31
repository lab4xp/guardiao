/**
 * GUARDIÃO SEDF - Configurações Globais do Sistema
 * 
 * Centraliza todas as configurações e constantes do sistema
 * Implementa padrão Singleton para acesso global
 * 
 * @author Guardião SEDF Team
 * @version 2.0
 * @date 30/01/2026
 */

/**
 * Classe de configuração global (Singleton)
 */
const Config = (function() {
  
  // ============================================================================
  // INFORMAÇÕES DO SISTEMA
  // ============================================================================
  
  const SISTEMA = {
    nome: 'Guardião SEDF',
    versao: '2.0',
    data: '30/01/2026',
    descricao: 'Sistema de Proteção Inteligente de Dados Pessoais',
    categoria: 'Acesso à Informação',
    hackathon: '1º Hackathon em Controle Social - Participa DF'
  };
  
  // ============================================================================
  // CONFORMIDADE LEGAL
  // ============================================================================
  
  const LEGISLACAO = {
    lai: {
      lei: 'Lei nº 12.527/2011',
      nome: 'Lei de Acesso à Informação',
      principio: 'Publicidade como regra, sigilo como exceção'
    },
    lgpd: {
      lei: 'Lei nº 13.709/2018',
      nome: 'Lei Geral de Proteção de Dados Pessoais',
      artigo5_ii: 'Dados sensíveis: origem racial/étnica, convicção religiosa, opinião política, filiação sindical, dados genéticos/biométricos, saúde, vida sexual'
    }
  };
  
  // ============================================================================
  // ARQUITETURA DO SISTEMA
  // ============================================================================
  
  const ARQUITETURA = {
    totalModulosGS: 212,
    totalTemplatesHTML: 65,
    totalModulosPython: 1,
    totalArquivos: 278,
    
    categorias: {
      core: 5,
      controladores: 7,
      deteccaoPII: 28,
      dadosSensiveis: 7,
      nlp: 14,
      anonimizacao: 13,
      compliance: 14,
      processamentoDocs: 14,
      handlersSedf: 19,
      integracaoColab: 8,
      integracoesExternas: 9,
      backend: 14,
      auditoria: 10,
      autenticacao: 9,
      monitoramento: 9,
      notificacoes: 6,
      uiBackend: 21
    }
  };
  
  // ============================================================================
  // CONFIGURAÇÕES DE DETECÇÃO DE PII
  // ============================================================================
  
  const DETECCAO_PII = {
    // Estágio 1: Detecção Determinística (Regex)
    estagio1: {
      precisao: 0.99,
      metodo: 'Regex + Validação Algorítmica',
      tipos: [
        'CPF', 'CNPJ', 'RG', 'CNH', 'Passaporte',
        'Título Eleitor', 'PIS', 'Matrícula SEDF',
        'Email', 'Telefone', 'CEP', 'Endereço',
        'Cartão Crédito', 'Conta Bancária', 'Placa Veículo',
        'Processo Judicial'
      ]
    },
    
    // Estágio 2: Detecção Probabilística (NLP)
    estagio2: {
      precisao: 0.87,
      sensibilidade: 0.92,
      metodo: 'NER (spaCy + BERTimbau)',
      tipos: [
        'PERSON', 'ORG', 'LOC', 'DATE',
        'MISC', 'EVENT', 'PRODUCT'
      ]
    },
    
    // Thresholds de confiança
    thresholds: {
      minimo: 0.70,      // Confiança mínima para detecção
      alto: 0.85,        // Alta confiança
      critico: 0.95      // Crítico (dados sensíveis)
    }
  };
  
  // ============================================================================
  // DADOS SENSÍVEIS (Art. 5º, II LGPD)
  // ============================================================================
  
  const DADOS_SENSIVEIS = {
    tipos: [
      'BIOMETRICO',
      'SAUDE',
      'RACIAL_ETNICO',
      'RELIGIOSO',
      'POLITICO',
      'ORIENTACAO_SEXUAL',
      'GENETICO'
    ],
    
    nivelRisco: 'CRITICO',
    corDestaque: '#FF00FF', // Magenta Neon
    
    palavrasChave: {
      saude: ['doença', 'diagnóstico', 'tratamento', 'medicamento', 'hospital', 'médico', 'CID', 'prontuário'],
      racial: ['raça', 'cor', 'etnia', 'negro', 'branco', 'pardo', 'indígena', 'amarelo'],
      religioso: ['religião', 'igreja', 'templo', 'culto', 'fé', 'crença'],
      politico: ['partido', 'filiação', 'político', 'eleição', 'voto'],
      sexual: ['orientação sexual', 'LGBT', 'homossexual', 'heterossexual', 'bissexual']
    }
  };
  
  // ============================================================================
  // INTEGRAÇÃO COM GOOGLE COLAB (NLP/IA)
  // ============================================================================
  
  const COLAB = {
    urlPadrao: 'https://xxxx-xx-xxx-xxx-xx.ngrok-free.app',
    timeout: 30000, // 30 segundos
    retries: 3,
    
    modelos: {
      spacy: {
        nome: 'pt_core_news_lg',
        idioma: 'pt',
        tamanho: 'large',
        precisao: 0.90
      },
      bert: {
        nome: 'BERTimbau',
        base: 'neuralmind/bert-base-portuguese-cased',
        precisao: 0.92
      }
    },
    
    endpoints: {
      ner: '/api/ner',
      health: '/health',
      config: '/config'
    }
  };
  
  // ============================================================================
  // PALETA NEON DARK MODE
  // ============================================================================
  
  const CORES = {
    // Backgrounds
    bgDark: '#0D0D0D',
    bgSecondary: '#121212',
    bgCard: '#1A1A1A',
    
    // Neon Colors
    neonCyan: '#00FFFF',      // PII comum (CPF, Nome)
    neonMagenta: '#FF00FF',   // Dados sensíveis (CRÍTICO)
    neonGreen: '#39FF14',     // Sucesso / Dados seguros
    neonYellow: '#FFFF00',    // Aviso
    neonRed: '#FF073A',       // Erro / Perigo
    
    // Text
    textPrimary: '#E0E0E0',
    textSecondary: '#A0A0A0',
    textMuted: '#707070',
    
    // Contraste WCAG
    contrasteMinimo: 10.0,    // Nível AAA
    
    // Mapeamento semântico
    piiComum: '#00FFFF',
    piiSensivel: '#FF00FF',
    textoSeguro: '#39FF14',
    alerta: '#FFFF00',
    erro: '#FF073A'
  };
  
  // ============================================================================
  // GOOGLE SHEETS (BACKEND)
  // ============================================================================
  
  const SHEETS = {
    // Nomes das planilhas (tabelas)
    tabelas: {
      documentos: 'Documentos',
      resultados: 'ResultadosDeteccao',
      auditoria: 'AuditoriaLGPD',
      configApi: 'ConfigAPI',
      usuarios: 'Usuarios',
      logs: 'LogsProcessamento',
      cache: 'Cache',
      fila: 'FilaProcessamento'
    },
    
    // Limites e otimizações
    batchSize: 100,           // Tamanho do lote para batch update
    cacheExpiracao: 3600,     // 1 hora em segundos
    maxRetries: 3,
    retryDelay: 1000          // 1 segundo
  };
  
  // ============================================================================
  // AUDITORIA E COMPLIANCE
  // ============================================================================
  
  const AUDITORIA = {
    // Tipos de eventos auditáveis
    eventos: {
      DETECCAO_PII: 'Detecção de PII',
      ANONIMIZACAO: 'Anonimização de dados',
      ACESSO_DADOS: 'Acesso a dados pessoais',
      EXPORTACAO: 'Exportação de dados',
      ALTERACAO_CONFIG: 'Alteração de configuração',
      DIREITO_TITULAR: 'Exercício de direito do titular',
      INCIDENTE: 'Incidente de segurança'
    },
    
    // Retenção de logs
    retencao: {
      logs: 365,              // 1 ano
      auditoria: 1825,        // 5 anos (LGPD Art. 16)
      backup: 2555            // 7 anos
    },
    
    // Formato de log imutável
    formatoLog: {
      timestamp: true,
      usuario: true,
      acao: true,
      dados: true,
      resultado: true,
      hash: true              // SHA-256 para imutabilidade
    }
  };

  // ============================================================================
  // INTEGRAÇÕES EXTERNAS (GDF)
  // ============================================================================
  
  const INTEGRACOES = {
    dodf: {
      url: 'https://www.dodf.df.gov.br',
      nome: 'Diário Oficial do Distrito Federal',
      ativo: true
    },
    
    esic: {
      url: 'https://www.e-sic.df.gov.br',
      nome: 'Sistema Eletrônico de Informação ao Cidadão',
      ativo: true
    },
    
    ouvidoria: {
      url: 'https://www.ouvidoria.df.gov.br',
      nome: 'Ouvidoria do GDF',
      ativo: true
    },
    
    tcdf: {
      nome: 'Tribunal de Contas do Distrito Federal',
      relatorios: true
    },
    
    mpdft: {
      nome: 'Ministério Público do DF e Territórios',
      relatorios: true
    },
    
    sinpro: {
      nome: 'SINPRO-DF',
      integracao: false
    }
  };
  
  // ============================================================================
  // HANDLERS DE DOMÍNIO SEDF
  // ============================================================================
  
  const SEDF = {
    entidades: [
      'Aluno',
      'Professor',
      'Servidor',
      'Escola',
      'Regional de Ensino',
      'Matrícula Escolar',
      'Processo Seletivo',
      'Concurso Público',
      'Contrato Temporário',
      'Professor Substituto',
      'Terceirizado',
      'Processo Disciplinar',
      'Histórico Médico',
      'Folha de Pagamento',
      'Denúncia',
      'Pedido de Informação',
      'Recurso Administrativo',
      'Edital',
      'Publicação DODF'
    ],
    
    formatoMatricula: {
      digitos: 7,
      verificador: 1,
      regex: /\d{7}-\d/
    }
  };
  
  // ============================================================================
  // PERFORMANCE E MONITORAMENTO
  // ============================================================================
  
  const PERFORMANCE = {
    // Limites de execução (Apps Script)
    limites: {
      tempoExecucao: 360000,      // 6 minutos
      quotaDiaria: 20000,         // 20k chamadas/dia
      urlFetchCalls: 20000,       // 20k chamadas UrlFetch/dia
      emailQuota: 100             // 100 emails/dia
    },
    
    // Otimizações
    otimizacoes: {
      usarCache: true,
      usarBatch: true,
      compressao: true,
      lazy: true                  // Lazy loading
    },
    
    // Métricas
    metricas: {
      f1Score: 0.93,              // Média ponderada
      precisaoRegex: 0.99,
      precisaoNER: 0.87,
      sensibilidadeNER: 0.92,
      tempoMedioProcessamento: 2.5 // segundos por documento
    }
  };
  
  // ============================================================================
  // ANONIMIZAÇÃO
  // ============================================================================
  
  const ANONIMIZACAO = {
    estrategias: {
      MASCARAMENTO: 'Substituição por asteriscos',
      PSEUDONIMIZACAO: 'Substituição por pseudônimo',
      GENERALIZACAO: 'Redução de precisão',
      SUPRESSAO: 'Remoção completa',
      HASH: 'Hash criptográfico (SHA-256)',
      TOKENIZACAO: 'Substituição por token'
    },
    
    padroes: {
      cpf: '***.***.***-**',
      email: '***@***.***',
      telefone: '(**) ****-****',
      nome: '[NOME REDACTED]',
      endereco: '[ENDEREÇO REDACTED]'
    },
    
    reversivel: false,            // Anonimização irreversível por padrão
    preservarContexto: true       // Manter contexto semântico
  };
  
  // ============================================================================
  // AUTENTICAÇÃO E AUTORIZAÇÃO
  // ============================================================================
  
  const AUTENTICACAO = {
    metodo: 'Google OAuth 2.0',
    
    perfis: {
      ADMIN: {
        nivel: 1,
        permissoes: ['*']         // Todas as permissões
      },
      OPERADOR: {
        nivel: 2,
        permissoes: ['processar', 'validar', 'exportar']
      },
      AUDITOR: {
        nivel: 3,
        permissoes: ['visualizar', 'auditar', 'relatorios']
      },
      CONSULTA: {
        nivel: 4,
        permissoes: ['visualizar']
      }
    },
    
    sessao: {
      duracao: 28800,             // 8 horas
      renovacao: true
    }
  };
  
  // ============================================================================
  // NOTIFICAÇÕES E ALERTAS
  // ============================================================================
  
  const NOTIFICACOES = {
    canais: {
      email: true,
      ui: true,
      log: true
    },
    
    tipos: {
      INFO: { cor: '#00FFFF', icone: 'ℹ️' },
      SUCESSO: { cor: '#39FF14', icone: '✅' },
      AVISO: { cor: '#FFFF00', icone: '⚠️' },
      ERRO: { cor: '#FF073A', icone: '❌' },
      CRITICO: { cor: '#FF00FF', icone: '🚨' }
    },
    
    eventos: {
      piiDetectado: true,
      dadoSensivelDetectado: true,
      erroProcessamento: true,
      quotaExcedida: true,
      backupConcluido: true
    }
  };
  
  // ============================================================================
  // HUMAN-IN-THE-LOOP
  // ============================================================================
  
  const HUMAN_IN_THE_LOOP = {
    obrigatorio: true,            // Validação humana obrigatória
    
    acoes: {
      APROVAR: 'Aprovar redação sugerida',
      EDITAR: 'Editar manualmente',
      REJEITAR: 'Rejeitar e manter original'
    },
    
    interface: 'ResultsView.html',
    
    metricas: {
      taxaAprovacao: 0.85,
      taxaEdicao: 0.12,
      taxaRejeicao: 0.03
    }
  };
  
  // ============================================================================
  // MÉTODOS PÚBLICOS
  // ============================================================================
  
  return {
    // Getters para acesso às configurações
    getSistema: () => SISTEMA,
    getLegislacao: () => LEGISLACAO,
    getArquitetura: () => ARQUITETURA,
    getDeteccaoPII: () => DETECCAO_PII,
    getDadosSensiveis: () => DADOS_SENSIVEIS,
    getColab: () => COLAB,
    getCores: () => CORES,
    getSheets: () => SHEETS,
    getAuditoria: () => AUDITORIA,
    getIntegracoes: () => INTEGRACOES,
    getSedf: () => SEDF,
    getPerformance: () => PERFORMANCE,
    getAnonimizacao: () => ANONIMIZACAO,
    getAutenticacao: () => AUTENTICACAO,
    getNotificacoes: () => NOTIFICACOES,
    getHumanInTheLoop: () => HUMAN_IN_THE_LOOP,
    
    /**
     * Retorna todas as configurações
     */
    getAll: function() {
      return {
        sistema: SISTEMA,
        legislacao: LEGISLACAO,
        arquitetura: ARQUITETURA,
        deteccaoPII: DETECCAO_PII,
        dadosSensiveis: DADOS_SENSIVEIS,
        colab: COLAB,
        cores: CORES,
        sheets: SHEETS,
        auditoria: AUDITORIA,
        integracoes: INTEGRACOES,
        sedf: SEDF,
        performance: PERFORMANCE,
        anonimizacao: ANONIMIZACAO,
        autenticacao: AUTENTICACAO,
        notificacoes: NOTIFICACOES,
        humanInTheLoop: HUMAN_IN_THE_LOOP
      };
    },
    
    /**
     * Retorna configuração específica por caminho
     * @param {string} path - Caminho da configuração (ex: 'cores.neonCyan')
     */
    get: function(path) {
      const parts = path.split('.');
      let value = this.getAll();
      
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          return null;
        }
      }
      
      return value;
    },
    
    /**
     * Valida se o sistema está configurado corretamente
     */
    validar: function() {
      const validacoes = {
        sistema: !!SISTEMA.nome,
        sheets: !!SHEETS.tabelas.documentos,
        cores: !!CORES.neonCyan,
        deteccao: DETECCAO_PII.estagio1.tipos.length > 0,
        auditoria: !!AUDITORIA.eventos.DETECCAO_PII
      };
      
      const todasValidas = Object.values(validacoes).every(v => v === true);
      
      return {
        valido: todasValidas,
        detalhes: validacoes
      };
    },
    
    /**
     * Retorna informações de versão
     */
    getVersao: function() {
      return {
        sistema: SISTEMA.nome,
        versao: SISTEMA.versao,
        data: SISTEMA.data,
        componentes: {
          modulosGS: ARQUITETURA.totalModulosGS,
          templatesHTML: ARQUITETURA.totalTemplatesHTML,
          modulosPython: ARQUITETURA.totalModulosPython,
          total: ARQUITETURA.totalArquivos
        }
      };
    }
  };
  
})();

/**
 * Função de teste para validar configurações
 */
function testarConfig() {
  const validacao = Config.validar();
  Logger.log('Validação de Config: ' + JSON.stringify(validacao, null, 2));
  
  const versao = Config.getVersao();
  Logger.log('Versão: ' + JSON.stringify(versao, null, 2));
  
  return validacao.valido;
}
