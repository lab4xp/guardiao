# 🛠️ GAS Python Toolbelt
*Ferramentas de desenvolvimento local para Projetos Google Apps Script*

Este diretório contém scripts Python projetados para acelerar o desenvolvimento de projetos GAS, permitindo testes locais, validação e otimização antes do deploy.

## 🚀 Ferramentas Principais

### 1. `reality_check.py` (⭐ NOVO - Análise Brutal)
**A ferramenta mais importante!** Faz uma análise HONESTA e BRUTAL do estado real do projeto.
- **Classifica arquivos** em: Implementado, Parcial, Stub, Esqueleto
- **Analisa funções** vazias vs implementadas
- **Calcula dívida técnica** (TODOs, FIXMEs, Not Implemented)
- **Estima % de conclusão** realista

```bash
python reality_check.py
```
> Gera: `reality_check_report.json`

### 2. `roadmap_generator.py` (⭐ NOVO - Roadmap)
Gera um plano de ação priorizado baseado na análise do projeto.
- **Organiza tarefas** por categoria (core, security, lgpd, etc.)
- **Sugere sprints** com duração e prioridade
- **Estima esforço** em horas de trabalho

```bash
python roadmap_generator.py
```
> Gera: `ROADMAP.md`

### 3. `local_gas_server.py` (Simulador Local)
Simula o ambiente do Google Apps Script no seu navegador local.
- **Serve seus arquivos HTML** processando templates `<?!= include() ?>`.
- **Mocka `google.script.run`** para que o frontend funcione sem erros.
- **Simula backend** respondendo a chamadas como `verificarSaude()` ou `include()`.

```bash
python local_gas_server.py
```
> Acesse: http://localhost:8080

### 4. `gas_optimizer.py` (Análise de Performance)
Analisa seu código `.gs` em busca de problemas específicos da plataforma GAS.
- Detecta **chamadas de API dentro de loops** (principal causa de lentidão).
- Identifica IDs hardcoded.
- Sugere uso de `getValues()` vs `getValue()`.

```bash
python gas_optimizer.py
```

### 5. `schema_validator.py` (Validação de Dados)
Garante que os dados trocados entre Frontend e Backend sigam o contrato.
- Valida JSON Schemas.
- Suporta formatos brasileiros (**CPF, CNPJ, Telefone**).

```bash
python schema_validator.py
```

### 6. `api_doc_generator.py` (Documentação)
Gera documentação Markdown automática do seu projeto.
- Lê JSDoc de funções e classes.
- Detecta endpoints `doGet`/`doPost`.

```bash
python api_doc_generator.py . docs.md
```

### 7. `request_flow_visualizer.py` (Monitoramento)
Dashboard para visualizar requisições HTTP entre serviços (útil se você usa `UrlFetchApp` para APIs externas mockadas).

```bash
python request_flow_visualizer.py
```

---

## 🏃 Executar Tudo

Para rodar todas as ferramentas de análise de uma vez:

```bash
python run_all.py
```

## 📋 Requisitos
- Python 3.8+
- Nenhuma biblioteca externa obrigatória (todos scripts são standalone).

