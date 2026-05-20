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
import { Header } from '../components/Header';
import { COLORS, TARGET_APP_PACKAGE } from '../utils/constants';

export const SettingsScreen: React.FC = () => {
  const [overlay, setOverlay] = React.useState(true);
  const [sync, setSync] = React.useState(true);

  const handleChangePackage = () =>
    Alert.alert('Target App', `Current: ${TARGET_APP_PACKAGE}\n\nTo change, update the AccessibilityService filter in AndroidManifest.xml.`);

  return (
    <View style={styles.root}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>System Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Target App Package</Text>
              <Text style={styles.settingDesc}>{TARGET_APP_PACKAGE}</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn} onPress={handleChangePackage}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Floating Overlay</Text>
              <Text style={styles.settingDesc}>Live status widget & manual tap override</Text>
            </View>
            <Switch
              value={overlay}
              onValueChange={setOverlay}
              trackColor={{ false: COLORS.slate700, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Data Synchronization</Text>
              <Text style={styles.settingDesc}>Upload logs & stats to Supabase backend</Text>
            </View>
            <Switch
              value={sync}
              onValueChange={setSync}
              trackColor={{ false: COLORS.slate700, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Architecture</Text>
          {[
            'Runs entirely locally via Android Accessibility Service',
            'No root, no modified APKs, no network interception',
            'Randomized delays & natural click patterns',
            'Fallback to Google ML Kit OCR for complex UIs',
            'Supabase sync for logs, stats & admin panel',
          ].map((line, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{line}</Text>
            </View>
          ))}
        </View>

        <View style={styles.versionCard}>
          <Text style={styles.versionText}>DriveBot Pro v1.0.0</Text>
          <Text style={styles.buildText}>Build 100 • React Native 0.73</Text>
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
    gap: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginBottom: 8 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 8,
    gap: 12,
  },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 14, fontWeight: '500', color: COLORS.white },
  settingDesc: { fontSize: 12, color: COLORS.slate400, marginTop: 2 },
  changeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: COLORS.slate700,
    borderRadius: 8,
  },
  changeBtnText: { fontSize: 13, color: COLORS.white },
  infoCard: {
    backgroundColor: '#3b82f610',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3b82f630',
    gap: 8,
  },
  infoTitle: { fontSize: 14, fontWeight: '600', color: COLORS.blue400, marginBottom: 4 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bullet: { fontSize: 13, color: COLORS.blue400, marginTop: 1 },
  bulletText: { flex: 1, fontSize: 13, color: '#93c5fd', lineHeight: 19 },
  versionCard: { alignItems: 'center', paddingVertical: 8, gap: 4 },
  versionText: { fontSize: 13, color: COLORS.slate500 },
  buildText: { fontSize: 11, color: COLORS.slate700 },
});
