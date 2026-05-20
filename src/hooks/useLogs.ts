import { useCallback } from 'react';
import { useAppStore } from '../store';

export const useLogs = () => {
  const { logs, stats, clearLogs } = useAppStore();

  const exportCSV = useCallback(() => {
    const header = 'Time,Type,Message\n';
    const rows = logs
      .map(l => `${new Date(l.time).toISOString()},${l.type},"${l.msg}"`)
      .join('\n');
    return header + rows;
  }, [logs]);

  return { logs, stats, clearLogs, exportCSV };
};
