# 📚 API Documentation - Participa DF

> Gerado em 2026-01-31 07:49:49

## 🏛️ Classes


## 📦 Módulos

### AccessibilityManager

- `isHighContrastEnabled()`
- `toggleScreenReader(enabled)`

### ActivityTracker

- `registrarAtividade(acao, detalhes)`
- `buscarAtividadesUsuario(email)`

### AddressRegex

- `getLogradouroRegex()`
- `getCepRegex()`

### AlertManager

- `criarAlerta(tipo, mensagem)`
- `marcarAlertaComoLido(alertaId)`

### AlertSender

- `enviarAlertaEmail(destinatarios, assunto, corpo)`

### AmbiguityResolver

- `resolverAmbiguidadeNome(nome)`

### ApiKeyManager

- `armazenarChaveApi(servico, chave)`
- `obterChaveApi(servico)`
- `removerChaveApi(servico)`

### AuthManager

- `getClientSideUser()`

### AutoProcessor

- `processarNovosArquivos(folderId)`
- `marcarComoProcessado(fileId)`

### BackupManager

- `criarBackup()`
- `registrarBackup(backupId)`

### BatchUpdater

- `atualizarEmLote(sheetName, updates)`
- `atualizarStatusEmLote(ids, novoStatus)`

### BertIntegration

- `analisarComBert(texto)`
- `extrairEntidades(resultado)`

### BiometricDataDetector

- `detectarDadosBiometricos(texto)`
- `marcarComoBiometrico(docId)`

### CartaoCredito

- `getCartaoCreditoRegex()`
- `validarCartaoCredito(numero)`

### CepRegex

- `getCepRegex()`
- `validarCep(cep)`
- `formatarCep(cep)`

### CircuitBreaker

- `isCircuitBreakerAberto()`
- `abrirCircuitBreaker()`
- `fecharCircuitBreaker()`

### ClassificacaoAnonymizer

- `anonimizarListaClassificacao(lista)`
- `salvarListaAnonimizada(listaAnonimizada, concursoId)`

### CnhRegex

- `getCnhRegex()`
- `validarCnh(cnh)`
- `anonimizarCnh(cnh)`

### CnpjRegex

- `getCnpjRegex()`
- `limparCnpj(cnpj)`
- `formatarCnpj(cnpj)`

### ColorCoder

- `aplicarCodificacaoCor(linha, nivel)`
- `removerCodificacaoCor(linha)`

### ColorPaletteManager

- `obterPaletaNeon()`
- `aplicarTemaNeon(sheetName)`

### ComplianceReporter

- `gerarRelatorioCompliance(dataInicio, dataFim)`
- `salvarRelatorioCompliance(relatorio)`

### ConcursoPublicoHandler

- `registrarConcursoPublico(dadosConcurso)`
- `buscarConcursosPorOrgao(orgao)`

### ConfidenceScorer

- `calcularScoreConfianca(deteccao)`
- `classificarConfianca(score)`

### Config

- `testarConfig()`

### Configuracao

- `criarConfiguracaoPadrao()`
- `salvarConfiguracao(config)`

### Constants

- `getNiveisSensibilidade()`
- `getStatusProcessamento()`
- `getTiposPii()`

### ContaBancariaRegex

- `getContaBancariaRegex()`
- `validarContaBancaria(conta)`
- `anonimizarContaBancaria(conta)`

### ContextAnalyzer

- `analisarContexto(texto, posicao)`
- `isFalsoPositivo(entidade, contexto)`

### ContextPreserver

- `anonimizarComContexto(texto, entidades)`
- `salvarMapeamentoContexto(docId, mapeamento)`

### ContrastChecker

- `calcularContraste(cor1, cor2)`
- `atendeWcagAA(contraste)`

### ContratoTemporarioHandler

- `registrarContratoTemporario(dadosContrato)`
- `verificarContratosVencidos()`

### CorsHandler

- `adicionarHeadersCors(response)`
- `tratarPreflightCors()`

### CpfRegex

- `getCpfRegex()`
- `formatarCpf(cpf)`

### CpfValidator

- `limparCpf(cpf)`
- `validarDigitosVerificadores(cpf)`
- `formatarCpf(cpf)`
- `mascarar(cpf, estrategia = 'PARCIAL')`
- `extrairContexto(texto, posicao, janela = 50)`
- `testarCpfValidator()`

### CustomPatternBuilder

- `criarPadraoCustomizado(tipo, regex)`
- `listarPadroesCustomizados()`

### DashboardBuilder

- `gerarDadosDashboard()`
- `atualizarDashboard()`

### DataArchiver

- `arquivarDocumentosAntigos(diasRetencao)`
- `moverParaArquivo(registro, linha)`

### DataFlowMapper

- `mapearFluxoDados(origem, destino, tipoDado)`
- `listarFluxosDados()`

### DataMinimizer

- `minimizarDados(registro, camposNecessarios)`
- `aplicarMinimizacaoLote(sheetName, colunasRemover)`

### DataProtectionOfficer

- `registrarSolicitacaoDpo(tipo, descricao)`
- `listarSolicitacoesPendentes()`

### DataPurger

- `executarExpurgoDados()`
- `removerRegistrosExpirados(sheetName, dataLimite)`

### DataValidator

- `validarIntegridadeRegistro(registro)`
- `validarEmail(email)`

### DateRegex

- `getDataBrasileiraRegex()`
- `validarDataBrasileira(data)`

### Denuncia

- `criarDenuncia(dadosDenuncia)`
- `atualizarStatusDenuncia(denunciaId, novoStatus)`

### DenuncianteProtector

- `anonimizarDenunciante(dadosDenunciante)`
- `armazenarMapeamentoDenunciante(idAnonimo, dadosReais)`

### DigestGenerator

- `gerarResumoDiario()`
- `enviarResumoPorEmail(resumo, destinatarios)`

### DocumentValidator

- `validarDocumento(docId)`
- `documentoJaProcessado(fileId)`

### Documento

- `criarDocumento(dadosDocumento)`
- `buscarDocumentoPorId(docId)`

### DocxParser

- `extrairTextoDocx(fileId)`
- `extrairMetadadosDocx(fileId)`

### DodfPublisher

- `publicarNoDodf(docId)`
- `registrarPublicacao(docId, dataPublicacao)`

### DodfValidator

- `validarConformidadeDodf(textoPublicacao)`
- `marcarNaoConforme(publicacaoId, problemas)`

### DriveMonitor

- `monitorarPastaDrive(folderId)`
- `processarNovoArquivo(file)`

### EditalProcessor

- `processarEdital(editalId)`
- `marcarParaRevisao(editalId, problemas)`

### EmailRegex

- `getEmailRegex()`
- `validarEmailRfc(email)`

### EmailSender

- `enviarNotificacao(destinatario, assunto, mensagem)`
- `registrarEnvioEmail(destinatario, assunto)`

### EntidadeNomeada

- `criarEntidadeNomeada(texto, tipo, posicao)`
- `salvarEntidadeNomeada(docId, entidade)`

### EntityRulerManager

- `adicionarRegraEntityRuler(padrao, tipo)`
- `listarRegrasAtivas()`

### ErrorDisplay

- `exibirErro(mensagem, detalhes)`
- `registrarErroSilencioso(erro)`

### ErrorHandler

- `tratarErro(erro, contexto)`
- `isErroCritico(erro)`

### EscolaDataHandler

- `buscarEscolaPorInep(codigoInep)`
- `atualizarDadosEscola(codigoInep, novosDados)`

### FalseNegativeHandler

- `registrarFalsoNegativo(texto, tipoPii)`
- `processarFalsosNegativos()`

### FalsePositiveHandler

- `registrarFalsoPositivo(texto, tipoDetectado)`
- `adicionarExcecao(texto)`

### FeedbackCollector

- `coletarFeedback(docId, entidadeId, correto)`
- `analisarFeedback()`

### FileUploader

- `fazerUploadDrive(arquivo, folderId)`
- `registrarUpload(fileId, nomeArquivo)`

### FileWatcher

- `monitorarMudancasArquivo(fileId)`
- `processarMudanca(fileId)`

### FolderOrganizer

- `organizarPastasPorTipo(folderId)`
- `moverParaSubpasta(file, tipo, pastaRaiz)`

### FolhaPagamentoAnonymizer

- `anonimizarFolhaPagamento(dadosFolha)`
- `salvarFolhaAnonimizada(folhaAnonimizada, mesReferencia)`

### FormHandler

- `processarFormulario(dadosFormulario)`
- `salvarDadosFormulario(dados)`

### FormatConverter

- `converterParaPdf(fileId)`
- `converterParaCsv(spreadsheetId, sheetName)`

### HashGenerator

- `gerarHashDocumento(conteudo)`
- `registrarHashDocumento(docId, hash)`

### HashMapper

- `armazenarMapeamentoHash(hash, valorOriginal)`
- `reverterHash(hash)`
- `removerMapeamentoHash(hash)`

### HealthChecker

- `verificarSaudeDoSistema()`
- `verificarPlanilhas()`
- `verificarServicosExternos()`
- `verificarQuotasCriticas()`

### HiddenColumnDetector

- `detectarColunasOcultas(sheetName)`
- `exibirTodasColunas(sheetName)`

### HistoricoMedicoHandler

- `anonimizarHistoricoMedico(historicoMedico)`
- `salvarHistoricoAnonimizado(historico)`

### HtmlTemplateRenderer

- `renderizarTemplate(templateName, dados)`
- `incluirHtml(filename)`

### ImageExtractor

- `extrairImagensDocumento(docId)`
- `salvarImagensNoDrive(imagens, folderId)`

### ImpactAssessment

- `gerarRipd(dadosProjeto)`
- `salvarRipd(ripd)`

### IncidentReporter

- `registrarIncidente(dadosIncidente)`
- `notificarDpo(incidenteId, dados)`

### IndexManager

- `criarIndice(sheetName, coluna)`
- `buscarComIndice(sheetName, coluna, valor)`

### Installer

- `onOpen()`
- `abrirWebApp()`
- `setupPlanilha()`

### LanguageDetector

- `detectarIdioma(texto)`
- `isPortugues(texto)`

### LoadingIndicator

- `exibirCarregamento(mensagem)`
- `ocultarCarregamento()`
- `executarComCarregamento(funcao, mensagem)`

### LocationDetector

- `detectarLocalizacoes(texto)`
- `anonimizarLocalizacoes(texto)`

### LogAuditoria

- `criarLogAuditoria(acao, recurso, detalhes)`
- `salvarLogAuditoria(log)`

### Logger

- `log(nivel, mensagem, contexto)`
- `logInfo(mensagem, contexto)`
- `logError(mensagem, contexto)`

### Main

- `onOpen()`
- `abrirDashboard()`
- `processarDocumento()`
- `processarLote()`
- `validarResultados()`
- `verificarConformidade()`
- `gerarRelatorioAuditoria()`
- `gerenciarDireitosTitular()`
- `configurarColab()`
- `testarConexaoNER()`
- `atualizarNgrokUrl()`
- `abrirConfiguracoes()`
- `gerenciarUsuarios()`
- `executarBackup()`
- `abrirAjuda()`
- `mostrarSobre()`
- `instalarSistema()`
- `desinstalarSistema()`

### MatriculaEscolarHandler

- `registrarMatriculaEscolar(dadosMatricula)`
- `buscarMatriculasAluno(alunoId)`

### MatriculaRegex

- `getMatriculaRegex()`
- `formatarMatricula(matricula)`

### MedicalDataDetector

- `detectarDadosMedicos(texto)`
- `classificarSensibilidadeMedica(dadosMedicos)`

### MetadataCleaner

- `limparMetadados(fileId)`
- `listarMetadados(fileId)`

### Middleware

- `comAutenticacao(funcao)`
- `validarDados(dados, schema)`

### MigrationManager

- `executarMigracao(versaoAtual, versaoAlvo)`
- `atualizarVersaoSchema(novaVersao)`
- `obterVersaoSchema()`

### ModalManager

- `exibirModal(titulo, conteudo)`
- `exibirConfirmacao(mensagem)`

### ModelManager

- `carregarModelo(nomeModelo)`
- `atualizarVersaoModelo(nomeModelo, novaVersao)`

### ModelTrainer

- `retreinarModelo(nomeModelo, dadosTreinamento)`
- `avaliarModelo(nomeModelo)`

### MpdftReporter

- `gerarRelatorioMpdft(dataInicio, dataFim)`
- `salvarRelatorioMpdft(relatorio)`

### NeonThemeManager

- `aplicarTemaNeonDark(sheetName)`
- `removerTemaNeon(sheetName)`

### NgrokUrlUpdater

- `atualizarUrlNgrok(novaUrl)`
- `verificarNgrokAtivo()`

### NotificationManager

- `criarNotificacao(tipo, mensagem)`
- `marcarNotificacaoLida(notificacaoId)`

### NotificationSender

- `enviarNotificacaoPorEmail(destinatario, tipo, mensagem)`

### OfflineHandlers

- `processarDocumentoOffline(data)`
- `registrarEventoAudit(data)`
- `getClientSideUser()`

### OrganizationDetector

- `detectarOrganizacoes(texto)`
- `isOrganizacao(texto)`

### OuvidoriaIntegration

- `enviarManifestacaoOuvidoria(manifestacao)`
- `consultarManifestacao(protocolo)`

### PassaporteRegex

- `getPassaporteRegex()`
- `validarPassaporte(passaporte)`
- `anonimizarPassaporte(passaporte)`

### PatternMatcher

- `buscarPadroes(texto, padroes)`
- `aplicarPadroesCustomizados(texto)`

### PdfParser

- `extrairTextoPdf(fileId)`
- `extrairMetadadosPdf(fileId)`

### PedidoInformacaoHandler

- `registrarPedidoInformacao(pedido)`
- `atualizarStatusPedidoLai(protocolo, novoStatus)`

### PerformanceMonitor

- `registrarMetricaPerformance(operacao, tempoMs)`
- `executarComMonitoramento(funcao, nomeOperacao)`

### PermissionChecker

- `verificarPermissaoEspecifica(email, permissao)`
- `listarPermissoesUsuario(email)`

### PhoneRegex

- `getTelefoneRegex()`
- `validarTelefone(telefone)`
- `formatarTelefone(telefone)`

### PiiDetector

- `gerarHashTexto(texto)`
- `verificarCache(hash)`
- `armazenarCache(hash, deteccoes)`
- `executarDeteccaoRegex(texto)`
- `executarDeteccaoNER(texto)`
- `executarDeteccaoSensiveis(texto)`
- `removerDuplicatas(deteccoes)`
- `filtrarPorConfianca(deteccoes)`
- `ordenarDeteccoes(deteccoes)`
- `classificarRisco(deteccoes)`
- `enriquecerDeteccoes(deteccoes)`
- `testarPiiDetector()`

### PisRegex

- `getPisRegex()`
- `validarPis(pis)`
- `formatarPis(pis)`

### PlacaVeiculoRegex

- `getPlacaVeiculoRegex()`
- `validarPlacaVeiculo(placa)`
- `anonimizarPlacaVeiculo(placa)`

### PoliticalDataDetector

- `detectarDadosPoliticos(texto)`
- `classificarSensibilidadePolitica(dadosPoliticos)`

### PrazoMonitor

- `monitorarPrazosLai()`
- `alertarPrazoProximo(protocolo, diasRestantes)`

### PriorityScorer

- `calcularPrioridade(documento)`
- `ordenarPorPrioridade(documentos)`

### ProcessoJudicialRegex

- `getProcessoJudicialRegex()`
- `validarProcessoJudicial(processo)`
- `anonimizarProcessoJudicial(processo)`

### ProcessoSeletivo

- `criarProcessoSeletivo(dadosProcesso)`
- `buscarProcessoSeletivo(processoId)`

### ProcessoSeletivoHandler

- `registrarInscricaoProcessoSeletivo(processoId, dadosCandidato)`
- `listarInscricoesProcessoSeletivo(processoId)`

### ProfessorDataHandler

- `buscarProfessorPorMatricula(matricula)`
- `atualizarDadosProfessor(matricula, novosDados)`

### ProgressTracker

- `atualizarProgresso(tarefaId, percentual)`
- `marcarTarefaConcluida(tarefaId)`

### PublicDataClassifier

- `classificarDado(tipoDado, contexto)`
- `podeSerPublicado(classificacao)`

### PublicationValidator

- `validarParaPublicacao(docId)`
- `aprovarParaPublicacao(docId)`

### PurposeValidator

- `validarFinalidade(finalidade)`
- `verificarFinalidade(docId)`

### QueryBuilder

- `construirQuery(sheetName, filtros)`
- `buscarComLike(sheetName, coluna, padrao)`

### QueueManager

- `adicionarAFila(docId, prioridade)`
- `obterProximoDaFila()`
- `removerDaFila(docId)`

### QuotaManager

- `verificarQuota(servico)`
- `incrementarQuota(servico, quantidade)`

### RacialDataDetector

- `detectarDadosRaciais(texto)`
- `classificarSensibilidadeRacial(dadosRaciais)`

### RateLimiter

- `podeRequisitar(chave, limite, janelaTempo)`
- `registrarBloqueio(chave)`

### RecoveryManager

- `criarPontoRecuperacao(operacao, dados)`
- `recuperarDados(pontoId)`

### RecursoHandler

- `registrarRecursoLai(protocoloOriginal, dadosRecurso)`
- `atualizarStatusRecurso(protocoloRecurso, novoStatus)`

### RedactionReviewer

- `revisarParaPublicacaoLai(docId)`
- `aplicarRedacoes(docId)`

### RegexLibrary

- `obterTodasRegex()`
- `testarRegex(regex, texto)`

### RegionalEnsinoHandler

- `buscarRegionalPorCodigo(codigo)`
- `listarRegionaisEnsino()`

### ReligiousDataDetector

- `detectarDadosReligiosos(texto)`
- `classificarSensibilidadeReligiosa(dadosReligiosos)`

### ReportSender

- `enviarRelatorioPeriodico(tipoRelatorio, destinatarios)`
- `formatarRelatorio(relatorio)`

### RequestParser

- `parseGetRequest(e)`
- `parsePostRequest(e)`

### ResponseBuilder

- `construirRespostaSucesso(dados)`
- `construirRespostaErro(mensagem, codigo)`

### RestController

- `doGet(e)`
- `doPost(e)`
- `renderizarIndex()`
- `renderizarDashboard()`
- `renderizarDocumentacao()`
- `verificarSaude()`
- `obterVersao()`
- `buscarResultados(params)`
- `buscarAuditoria(params)`
- `detectarPII(dados)`
- `anonimizarTexto(dados)`
- `validarDocumento(dados)`
- `processarLote(dados)`
- `aprovarResultado(dados)`
- `rejeitarResultado(dados)`
- `exportarDados(dados)`
- `registrarFeedback(dados)`
- `executarDeteccaoRegex(texto)`
- `executarDeteccaoNER(texto)`
- `validarAutenticacao(e)`
- `testarSheets()`
- `testarCache()`
- `responderJSON(dados)`
- `responderErro(codigo, mensagem, erro = null)`
- `include(filename)`
- `testarRestController()`
- `obterUrlWebApp()`

### RetryHandler

- `executarComRetry(funcao, maxTentativas)`
- `isErroRecuperavel(erro)`

### ReversibleAnonymizer

- `anonimizarReversivel(valor, chave)`
- `reverterAnonimizacao(valorAnonimizado, justificativa)`

### RgDetector

- `detectarRgs(texto)`
- `validarRg(rg)`
- `anonimizarRg(rg)`

### RgRegex

- `getRgRegex()`
- `formatarRg(rg)`

### RhDataHandler

- `buscarServidorPorMatricula(matricula)`
- `atualizarDadosRh(matricula, novosDados)`

### RightToPortabilityHandler

- `processarDireitoPortabilidade(cpf, formato)`
- `converterParaCsv(dados)`

### RightToRectificationHandler

- `processarDireitoRetificacao(cpf, correcoes)`
- `registrarSolicitacaoDireito(tipoDireito, cpfHash)`

### RiskAssessment

- `avaliarRiscos(tratamento)`
- `salvarAvaliacaoRisco(tratamentoId, avaliacao)`

### RiskLevelClassifier

- `classificarNivelRisco(tipoDado, contexto)`
- `calcularScoreRisco(nivelRisco)`

### RouteHandler

- `include(filename)`
- `navigateTo(route, params)`

### SearchEngine

- `buscarDocumentos(termo)`
- `buscaAvancada(filtros)`

### SentimentAnalyzer

- `analisarSentimento(texto)`

### ServidorDataHandler

- `buscarServidorPorCpf(cpf)`
- `listarServidoresAtivos()`

### SexualOrientationDetector

- `detectarDadosOrientacaoSexual(texto)`
- `classificarSensibilidadeOrientacaoSexual(dados)`

### ShareManager

- `compartilharArquivo(fileId, email, permissao)`
- `removerCompartilhamento(fileId, email)`

### SignatureDetector

- `detectarAssinaturas(texto)`
- `removerAssinaturas(texto)`

### SinproIntegration

- `enviarParaSinpro(dados)`
- `consultarSinpro(matricula)`

### SpanMerger

- `mesclarSpans(spans)`
- `removerSpansDuplicados(spans)`

### SpreadsheetParser

- `extrairDadosPlanilha(fileId, sheetName)`
- `converterPlanilhaParaJson(dados)`

### StressTester

- `executarStressTest()`

### SubstitutoHandler

- `registrarSubstituto(dadosSubstituto)`
- `listarSubstitutosAtivos()`

### SuccessDisplay

- `exibirSucesso(mensagem)`
- `registrarSucesso(operacao, detalhes)`

### TableExtractor

- `extrairTabelas(docId)`
- `extrairDadosTabela(tabela)`

### TcdfReporter

- `gerarRelatorioTcdf(dataInicio, dataFim)`
- `salvarRelatorioTcdf(relatorio)`

### TemplateManager

- `carregarTemplate(nomeTemplate)`
- `renderizarTemplateEmail(template, dados)`

### TerceirizadoHandler

- `registrarTerceirizado(dadosTerceirizado)`
- `listarTerceirizadosAtivos()`

### TimestampGenerator

- `gerarTimestamp()`
- `gerarTimestampUnix()`
- `formatarTimestamp(timestamp)`

### TituloEleitorRegex

- `getTituloEleitorRegex()`
- `validarTituloEleitor(titulo)`
- `formatarTituloEleitor(titulo)`

### TokenGenerator

- `gerarToken(email)`
- `validarToken(email, token)`

### TooltipManager

- `adicionarTooltip(sheetName, linha, coluna, texto)`
- `removerTooltip(sheetName, linha, coluna)`

### TopicClassifier

- `classificarTopico(texto)`

### TransactionManager

- `executarComLock(operacao, chave)`
- `executarComLockDocumento(operacao, docId)`

### TransparencyManager

- `publicarTransparenciaAtiva(docId)`
- `listarDocumentosTransparencia()`

### TriggerManager

- `triggerExiste(nomeFuncao)`
- `removerTrigger(nomeFuncao)`
- `criarTriggerSeguro(criarFn, nome)`
- `criarTriggerOnOpen()`
- `criarTriggerOnEdit()`
- `criarTriggerLimpezaCache()`
- `criarTriggerBackup()`
- `criarTriggerVerificacaoIntegridade()`
- `criarTriggerRelatorioCompliance()`
- `criarTriggerLimpezaLogs()`
- `criarTriggerAuditoriaMensal()`
- `criarTriggerMonitoramentoCotas()`
- `onEditTrigger(e)`
- `executarLimpezaCache()`
- `executarBackupAutomatico()`
- `executarVerificacaoIntegridade()`
- `executarRelatorioCompliance()`
- `executarLimpezaLogs()`
- `executarAuditoriaMensal()`
- `executarMonitoramentoCotas()`
- `testarTriggerManager()`

### UserValidator

- `validarCredenciais(email, senha)`
- `validarFormatoEmailUsuario(email)`

### Usuario

- `criarUsuario(dadosUsuario)`
- `buscarUsuarioPorEmail(email)`

### VersionController

- `criarVersaoDocumento(docId, conteudo)`
- `recuperarVersaoDocumento(docId, numeroVersao)`

### WebAppController

- `doGet(e)`
- `navigateTo(route, params)`


## 📊 Stats: 0 classes, 446 funções