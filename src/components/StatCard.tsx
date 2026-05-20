import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface Props {
  label: string;
  value: string | number;
  accentColor?: string;
}

export const StatCard: React.FC<Props> = ({ label, value, accentColor = COLORS.primary }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  label: {
    fontSize: 12,
    color: COLORS.slate400,
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
  },
});
