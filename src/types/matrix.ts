export interface MatrixSpill {
  id: string;
  startY: number;
  isDense: boolean;
  timestamp: number;
}

export interface TerminalLog {
  id: string;
  type: 'cmd' | 'output' | 'success' | 'warn' | 'error' | 'info';
  text: string;
  timestamp?: string;
}

export type Language = 'ES' | 'EN';
export type Theme = 'dark' | 'light';
