import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BotState } from '../utils/constants';

const STATE_COLORS: Record<BotState, string> = {
  IDLE: '#475569',
  SCANNING: '#3b82f6',
  EVALUATING: '#f59e0b',
  ACCEPTED: '#10b981',
  REJECTED: '#ef4444',
};

interface Props {
  state: BotState;
}

export const StatusBadge: React.FC<Props> = ({ state }) => (
  <View style={[styles.badge, { backgroundColor: STATE_COLORS[state] + '33' }]}>
    <View style={[styles.dot, { backgroundColor: STATE_COLORS[state] }]} />
    <Text style={[styles.label, { color: STATE_COLORS[state] }]}>{state}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
