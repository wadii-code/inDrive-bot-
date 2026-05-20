import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';
import { useAppStore } from '../store';

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  const { botState, isRunning } = useAppStore();
  const active = isRunning && botState !== 'IDLE';

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.pill, active ? styles.pillActive : styles.pillIdle]}>
        <View style={[styles.pillDot, { backgroundColor: active ? COLORS.emerald500 : COLORS.slate600 }]} />
        <Text style={styles.pillText}>{active ? 'Active' : 'Standby'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#10b98115',
    borderColor: '#10b98140',
  },
  pillIdle: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  pillDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  pillText: {
    fontSize: 11,
    color: COLORS.slate300,
  },
});
