import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAppStore } from '../store';
import { COLORS } from '../utils/constants';
import { PermissionsState } from '../store/slices/permissionsSlice';
import { PermissionService } from '../services/PermissionService';

const PERMISSION_ITEMS: Array<{
  key: keyof PermissionsState;
  title: string;
  desc: string;
}> = [
  {
    key: 'accessibility',
    title: 'Accessibility Service',
    desc: 'Reads screen elements to detect ride offers without root access.',
  },
  {
    key: 'overlay',
    title: 'Display Overlay',
    desc: 'Shows a floating widget with live status and manual tap override.',
  },
  {
    key: 'batteryOpt',
    title: 'Battery Optimization',
    desc: 'Prevents the background service from being suspended by Android.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { permissions, grantPermission } = useAppStore();

  const handleGrant = async (key: keyof PermissionsState) => {
    try {
      await PermissionService.requestPermission(key);
      grantPermission(key);
    } catch {
      Alert.alert('Permission Required', `Please enable ${key} manually in System Settings.`);
    }
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.headerBlock}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>D</Text>
        </View>
        <Text style={styles.title}>DriveBot Pro</Text>
        <Text style={styles.subtitle}>
          Requires Android accessibility permissions to safely automate ride detection.
          No root or APK modification needed.
        </Text>
      </View>

      {PERMISSION_ITEMS.map(p => (
        <View key={p.key} style={styles.permCard}>
          <View style={styles.permInfo}>
            <Text style={styles.permTitle}>{p.title}</Text>
            <Text style={styles.permDesc}>{p.desc}</Text>
          </View>
          {permissions[p.key] ? (
            <View style={styles.granted}>
              <Text style={styles.grantedText}>✓ Granted</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={() => handleGrant(p.key)}>
              <Text style={styles.btnText}>Enable</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.darkBg },
  content: { padding: 20, gap: 16 },
  headerBlock: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 12,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontSize: 28, fontWeight: '900', color: COLORS.white },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.white },
  subtitle: { fontSize: 14, color: COLORS.slate400, textAlign: 'center', lineHeight: 20 },
  permCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  permInfo: { flex: 1 },
  permTitle: { fontSize: 14, fontWeight: '600', color: COLORS.white },
  permDesc: { fontSize: 12, color: COLORS.slate400, marginTop: 4, lineHeight: 17 },
  granted: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#10b98120',
  },
  grantedText: { fontSize: 12, fontWeight: '600', color: COLORS.emerald400 },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  btnText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
});
