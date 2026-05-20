export const COLORS = {
  primary: '#3b82f6',
  accent: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  darkBg: '#0b0f19',
  cardBg: '#1e293b',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  white: '#ffffff',
  emerald400: '#34d399',
  emerald500: '#10b981',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  yellow400: '#facc15',
  red400: '#f87171',
  red500: '#ef4444',
};

export const BOT_STATES = {
  IDLE: 'IDLE',
  SCANNING: 'SCANNING',
  EVALUATING: 'EVALUATING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
} as const;

export type BotState = keyof typeof BOT_STATES;

export const LOG_TYPES = {
  SCAN: 'SCAN',
  DETECT: 'DETECT',
  EVAL: 'EVAL',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  ACTION: 'ACTION',
  SUCCESS: 'SUCCESS',
  SKIP: 'SKIP',
  SYSTEM: 'SYSTEM',
  OCR: 'OCR',
  ERROR: 'ERROR',
} as const;

export type LogType = keyof typeof LOG_TYPES;

export const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';

export const TARGET_APP_PACKAGE = 'com.rideshare.driver.app';

export const DELAY_CONFIG = {
  minHumanDelay: 600,
  maxHumanDelay: 1200,
  scanInterval: 4000,
  ocrFallbackDelay: 800,
  nodeParseDelay: 1200,
  initDelay: 1500,
};
