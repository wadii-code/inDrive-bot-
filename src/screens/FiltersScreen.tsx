import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useFilters } from '../hooks/useFilters';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

const SLIDERS = [
  { label: 'Minimum Ride Price', key: 'minPrice' as const, unit: 'MAD', min: 20, max: 200, step: 5 },
  { label: 'Maximum Pickup Distance', key: 'maxDist' as const, unit: 'km', min: 0.5, max: 15, step: 0.1 },
  { label: 'Minimum Client Rating', key: 'minRating' as const, unit: '★', min: 3.0, max: 5.0, step: 0.1 },
  { label: 'Min Profitability', key: 'minProf' as const, unit: 'MAD/km', min: 5, max: 30, step: 1 },
];

const TOGGLES = [
  { label: 'Night Mode Rules', key: 'nightMode' as const, desc: 'Increase min price during night hours (20:00–05:00).' },
  { label: 'Peak Hour Optimization', key: 'peakMode' as const, desc: 'Relax distance limits during high demand surges.' },
  { label: 'OCR Fallback', key: 'ocr' as const, desc: 'Use ML Kit text recognition if accessibility nodes are missing.' },
  { label: 'Auto-Retry on Crash', key: 'retry' as const, desc: 'Restart accessibility binding after app foreground changes.' },
];

export const FiltersScreen: React.FC = () => {
  const { filters, updateFilter, toggleFilter, resetFilters } = useFilters();

  const handleSave = () => Alert.alert('Saved', 'Filter configuration applied.');

  return (
    <View style={styles.root}>
      <Header title="Filters & Rules" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ride Filter Configuration</Text>

          {SLIDERS.map(s => (
            <View key={s.key} style={styles.sliderBlock}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>{s.label}</Text>
                <Text style={styles.sliderVal}>{filters[s.key]} {s.unit}</Text>
              </View>
              <Slider
                minimumValue={s.min}
                maximumValue={s.max}
                step={s.step}
                value={filters[s.key] as number}
                onValueChange={v => updateFilter(s.key, parseFloat(v.toFixed(1)))}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.slate700}
                thumbTintColor={COLORS.primary}
              />
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Automation Toggles</Text>
          {TOGGLES.map(t => (
            <View key={t.key} style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>{t.label}</Text>
                <Text style={styles.toggleDesc}>{t.desc}</Text>
              </View>
              <Switch
                value={!!filters[t.key]}
                onValueChange={() => toggleFilter(t.key)}
                trackColor={{ false: COLORS.slate700, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
            <Text style={styles.resetBtnText}>Reset to Defaults</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Configuration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.darkBg },
  content: { padding: 16, gap: 16 },
  card: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginBottom: 4 },
  sliderBlock: { gap: 6 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { fontSize: 13, color: COLORS.slate300 },
  sliderVal: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  toggleText: { flex: 1 },
  toggleLabel: { fontSize: 14, fontWeight: '500', color: COLORS.white },
  toggleDesc: { fontSize: 12, color: COLORS.slate400, marginTop: 2, lineHeight: 17 },
  actions: { flexDirection: 'row', gap: 12 },
  saveBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: { color: COLORS.white, fontWeight: '600', fontSize: 14 },
  resetBtn: {
    flex: 1,
    backgroundColor: COLORS.slate800,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate700,
  },
  resetBtnText: { color: COLORS.slate400, fontWeight: '500', fontSize: 14 },
});
