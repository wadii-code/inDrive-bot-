import { LogType } from '../../utils/constants';

export interface LogEntry {
  id: number;
  time: number;
  type: LogType;
  msg: string;
}

export interface StatsData {
  total: number;
  accepted: number;
  rejected: number;
  avgProfit: number;
}

export interface LogsSlice {
  logs: LogEntry[];
  stats: StatsData;
  addLog: (type: LogType, msg: string) => void;
  clearLogs: () => void;
  incrementAccepted: (profit: number) => void;
  incrementRejected: () => void;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: Date.now() - 120000, type: 'SCAN', msg: 'Scanning UI nodes for ride offer...' },
  { id: 2, time: Date.now() - 115000, type: 'DETECT', msg: 'Ride offer detected: 85 MAD | 2.1 km | Rating: 4.8' },
  { id: 3, time: Date.now() - 110000, type: 'EVAL', msg: 'Checking filters: Price OK | Distance OK | Rating OK' },
  { id: 4, time: Date.now() - 105000, type: 'ACCEPT', msg: 'Auto-accepting ride via Accessibility click simulation' },
  { id: 5, time: Date.now() - 45000, type: 'SCAN', msg: 'Waiting for next offer...' },
];

export const createLogsSlice = (set: any, get: any): LogsSlice => ({
  logs: INITIAL_LOGS,
  stats: { total: 142, accepted: 89, rejected: 32, avgProfit: 12.4 },

  addLog: (type, msg) =>
    set((state: any) => ({
      logs: [{ id: Date.now(), time: Date.now(), type, msg }, ...state.logs].slice(0, 100),
    })),

  clearLogs: () => set({ logs: [] }),

  incrementAccepted: (profit) =>
    set((state: any) => {
      const { stats } = state;
      const newTotal = stats.accepted + 1;
      return {
        stats: {
          ...stats,
          total: stats.total + 1,
          accepted: newTotal,
          avgProfit: ((stats.avgProfit * stats.accepted) + profit) / newTotal,
        },
      };
    }),

  incrementRejected: () =>
    set((state: any) => ({
      stats: {
        ...state.stats,
        total: state.stats.total + 1,
        rejected: state.stats.rejected + 1,
      },
    })),
});
