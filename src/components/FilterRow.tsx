import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS } from '../utils/constants';

interface SliderRowProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}

export const SliderRow: React.FC<SliderRowProps> = ({ label, value, unit, onChange }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.val}>{value} {unit}</Text>
    </View>
    {/* Slider replaced by native Slider — install @react-native-community/slider */}
  </View>
);

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, value, onToggle }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.slate700, true: COLORS.primary }}
        thumbColor={COLORS.white}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
  },
  desc: {
    fontSize: 12,
    color: COLORS.slate400,
    marginTop: 2,
  },
  val: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
