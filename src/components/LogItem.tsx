import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogEntry } from '../store/slices/logsSlice';
import { LogType, COLORS } from '../utils/constants';
import { formatTime } from '../utils/formatters';

const TYPE_COLORS: Record<LogType, { bg: string; text: string }> = {
  SCAN:    { bg: '#3b82f620', text: '#60a5fa' },
  DETECT:  { bg: '#8b5cf620', text: '#a78bfa' },
  EVAL:    { bg: '#f59e0b20', text: '#fbbf24' },
  ACCEPT:  { bg: '#10b98120', text: '#34d399' },
  REJECT:  { bg: '#ef444420', text: '#f87171' },
  ACTION:  { bg: '#3b82f620', text: '#60a5fa' },
  SUCCESS: { bg: '#10b98120', text: '#34d399' },
  SKIP:    { bg: '#47556920', text: '#94a3b8' },
  SYSTEM:  { bg: '#47556920', text: '#cbd5e1' },
  OCR:     { bg: '#f59e0b20', text: '#fbbf24' },
  ERROR:   { bg: '#ef444420', text: '#f87171' },
};

interface Props {
  log: LogEntry;
}

export const LogItem: React.FC<Props> = ({ log }) => {
  const colors = TYPE_COLORS[log.type] ?? { bg: '#47556920', text: '#94a3b8' };
  return (
    <View style={styles.row}>
      <Text style={styles.time}>{formatTime(log.time)}</Text>
      <View style={[styles.typeBadge, { backgroundColor: colors.bg }]}>
        <Text style={[styles.typeText, { color: colors.text }]}>{log.type}</Text>
      </View>
      <Text style={styles.msg} numberOfLines={2}>{log.msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
    gap: 8,
  },
  time: {
    fontSize: 11,
    color: COLORS.slate600,
    minWidth: 72,
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 64,
    alignItems: 'center',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  msg: {
    flex: 1,
    fontSize: 12,
    color: COLORS.slate300,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
});
