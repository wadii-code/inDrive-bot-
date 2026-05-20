import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { useLogs } from '../hooks/useLogs';
import { LogItem } from '../components/LogItem';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';
import type { LogEntry } from '../store/slices/logsSlice';

export const LogsScreen: React.FC = () => {
  const { logs, stats, clearLogs, exportCSV } = useLogs();
  const listRef = useRef<FlatList>(null);

  const handleExport = async () => {
    const csv = exportCSV();
    await Share.share({ message: csv, title: 'DriveBot Logs' });
  };

  const handleClear = () =>
    Alert.alert('Clear Logs', 'Delete all log entries?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearLogs },
    ]);

  const renderItem = ({ item }: { item: LogEntry }) => <LogItem log={item} />;
  const keyExtractor = (item: LogEntry) => String(item.id);

  return (
    <View style={styles.root}>
      <Header title="Live Logs" />

      <View style={styles.toolbar}>
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>{logs.length} entries</Text>
          <Text style={styles.statsSep}>•</Text>
          <Text style={styles.statsText}>{stats.accepted} accepted</Text>
          <Text style={styles.statsSep}>•</Text>
          <Text style={styles.statsText}>{stats.rejected} rejected</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleClear}>
            <Text style={styles.actionBtnText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleExport}>
            <Text style={styles.actionBtnText}>Export CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={logs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        style={styles.logPane}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No logs yet. Start the bot to begin.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.darkBg },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statsText: { fontSize: 12, color: COLORS.slate400 },
  statsSep: { fontSize: 12, color: COLORS.slate700 },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.slate800,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate700,
  },
  actionBtnText: { fontSize: 12, color: COLORS.slate300 },
  logPane: {
    flex: 1,
    backgroundColor: '#0f172a',
    margin: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  list: { padding: 12, gap: 2 },
  empty: { textAlign: 'center', color: COLORS.slate600, marginTop: 40, fontSize: 13 },
});
