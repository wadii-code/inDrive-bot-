import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/constants';
import type { LogEntry } from '../store/slices/logsSlice';
import type { StatsData } from '../store/slices/logsSlice';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SyncService = {
  async uploadLogs(driverId: string, logs: LogEntry[]): Promise<void> {
    const rows = logs.map(l => ({
      driver_id: driverId,
      event_type: l.type,
      message: l.msg,
      created_at: new Date(l.time).toISOString(),
    }));

    const { error } = await supabase.from('ride_logs').insert(rows);
    if (error) throw error;
  },

  async uploadStats(driverId: string, stats: StatsData): Promise<void> {
    const { error } = await supabase.from('driver_stats').upsert({
      driver_id: driverId,
      total_rides: stats.total,
      accepted_rides: stats.accepted,
      rejected_rides: stats.rejected,
      avg_profit_per_km: stats.avgProfit,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
  },

  async fetchDriverProfile(driverId: string) {
    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('id', driverId)
      .single();
    if (error) throw error;
    return data;
  },
};
