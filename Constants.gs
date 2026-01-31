/**
 * @fileoverview Constantes Globais - Guardião SEDF
 * Centraliza enums e definições de tipos para evitar Magic Strings.
 */

const APP_VERSION = '2.0.0';
const APP_NAME = 'Guardião SEDF';

/**
 * Tipos de Dados Pessoais (PII) detectáveis
 */
const PII_TYPES = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
  EMAIL: 'EMAIL',
  PHONE: 'TELEFONE',
  NAME: 'NOME',
  ADDRESS: 'ENDERECO',
  MATRICULA: 'MATRICULA_SEDF',
  RG: 'RG',
  PASSPORT: 'PASSAPORTE',
  CREDIT_CARD: 'CARTAO_CREDITO',
  BANK_ACCOUNT: 'CONTA_BANCARIA',
  PROCESS_NUMBER: 'NUMERO_PROCESSO',
  MEDICAL_DATA: 'DADO_MEDICO',
  POLITICAL_DATA: 'DADO_POLITICO',
  RELIGIOUS_DATA: 'DADO_RELIGIOSO',
  RACIAL_DATA: 'DADO_RACIAL',
  SEXUAL_ORIENTATION: 'ORIENTACAO_SEXUAL',
  BIRTH_DATE: 'DATA_NASCIMENTO'
};

/**
 * Níveis de Sensibilidade (LGPD Art. 5º, II)
 */
const SENSITIVITY_LEVELS = {
  NONE: 'NAO_PESSOAL',
  PERSONAL: 'PESSOAL',
  SENSITIVE: 'SENSIVEL', // Dados do Art. 5º, II da LGPD
  CRITICAL: 'CRITICO'     // Dados de menores ou segredo de justiça
};

/**
 * Estratégias de Anonimização
 */
const ANONYMIZATION_STRATEGIES = {
  REDACT: 'REDACT',           // Texto [REDACTED]
  MASK_PARTIAL: 'MASK_PARTIAL', // 123.***.***-90
  HASH: 'HASH',               // SHA-256
  PSEUDONYM: 'PSEUDONYM',     // "Titular A"
  GENERALIZE: 'GENERALIZE',   // "Morador de Brasília"
  SUPPRESS: 'SUPPRESS'        // Remove completamente
};

/**
 * Status de Processamento
 */
const PROCESS_STATUS = {
  PENDING: 'PENDENTE',
  PROCESSING: 'PROCESSANDO',
  COMPLETED: 'CONCLUIDO',
  FAILED: 'FALHOU',
  REVIEW_REQUIRED: 'REVISAO_NECESSARIA'
};

/**
 * Perfis de Usuário
 */
const USER_ROLES = {
  ADMIN: 'ADMIN',
  OPERATOR: 'OPERADOR',
  AUDITOR: 'AUDITOR',
  VIEWER: 'VISUALIZADOR'
};

/**
 * Compatibilidade com versões anteriores (legacy support)
 */
function getNiveisSensibilidade() { return SENSITIVITY_LEVELS; }
function getStatusProcessamento() { return PROCESS_STATUS; }
function getTiposPii() { return PII_TYPES; }
