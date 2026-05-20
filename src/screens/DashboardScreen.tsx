import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAppStore } from '../store';
import { useBotEngine } from '../hooks/useBotEngine';
import { StatusBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { Header } from '../components/Header';
import { COLORS, BOT_STATES } from '../utils/constants';

const BOT_STATE_MESSAGES: Record<string, { text: string; color: string }> = {
  IDLE:       { text: 'Waiting for ride offers...', color: COLORS.slate400 },
  SCANNING:   { text: 'Scanning UI Tree & Nodes...', color: COLORS.blue400 },
  EVALUATING: { text: 'Analyzing Profitability & Filters...', color: COLORS.yellow400 },
  ACCEPTED:   { text: 'Ride Accepted!', color: COLORS.emerald400 },
  REJECTED:   { text: 'Offer Rejected. Resuming scan.', color: '#f87171' },
};

export const DashboardScreen: React.FC = () => {
  const { botState, isRunning, startBot, stopBot, filters, stats } = useAppStore();
  useBotEngine();

  const stateMsg = BOT_STATE_MESSAGES[botState] ?? BOT_STATE_MESSAGES.IDLE;

  return (
    <View style={styles.root}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard label="Total Rides" value={stats.total} accentColor={COLORS.blue400} />
          <StatCard label="Accepted" value={stats.accepted} accentColor={COLORS.emerald400} />
          <StatCard label="Rejected" value={stats.rejected} accentColor="#f87171" />
        </View>
        <View style={[styles.statsRow, { marginTop: 8 }]}>
          <StatCard label="Avg Profit/km" value={`${stats.avgProfit.toFixed(1)} MAD`} accentColor={COLORS.yellow400} />
        </View>

        {/* Automation Engine */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Automation Engine</Text>
            <StatusBadge state={botState} />
          </View>

          <View style={styles.statusBox}>
            <Text style={[styles.statusText, { color: stateMsg.color }]}>{stateMsg.text}</Text>
            <Text style={styles.antiDetect}>Anti-Detection: Active  •  Human Delay: 0.6s–1.2s</Text>
          </View>

          <TouchableOpacity
            style={[styles.startBtn, isRunning ? styles.stopBtn : styles.activeBtn]}
            onPress={isRunning ? stopBot : startBot}
          >
            <Text style={styles.startBtnText}>
              {isRunning ? 'Stop Engine' : 'Start Automation'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Active rules */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Rules</Text>
          {[
            { label: 'Min Price', val: `${filters.minPrice} MAD` },
            { label: 'Max Pickup', val: `${filters.maxDist} km` },
            { label: 'Min Rating', val: `★ ${filters.minRating}` },
            { label: 'Night Mode', val: filters.nightMode ? 'ON' : 'OFF' },
            { label: 'Peak Mode', val: filters.peakMode ? 'ON' : 'OFF' },
          ].map((r, i) => (
            <View key={i} style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>{r.label}</Text>
              <Text style={styles.ruleVal}>{r.val}</Text>
            </View>
          ))}

          <View style={styles.healthBadge}>
            <Text style={styles.healthText}>System Health: 98.4%  •  Accessibility: Connected</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.darkBg },
  content: { padding: 16, gap: 16 },
  statsRow: { flexDirection: 'row', gap: 8 },
  card: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 14,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white },
  statusBox: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 20,
    alignItems: 'center',
    minHeight: 90,
    justifyContent: 'center',
    gap: 8,
  },
  statusText: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  antiDetect: { fontSize: 11, color: COLORS.slate600 },
  startBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  activeBtn: { backgroundColor: COLORS.primary },
  stopBtn: { backgroundColor: COLORS.slate700 },
  startBtnText: { color: COLORS.white, fontWeight: '600', fontSize: 15 },
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  ruleLabel: { fontSize: 13, color: COLORS.slate400 },
  ruleVal: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  healthBadge: {
    backgroundColor: '#10b98112',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10b98130',
    padding: 10,
  },
  healthText: { fontSize: 12, color: COLORS.emerald400 },
});
