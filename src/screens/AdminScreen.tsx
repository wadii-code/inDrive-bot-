import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

type DriverStatus = 'active' | 'pending' | 'suspended';

interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  plan: string;
  lastActive: string;
  requests: number;
}

const INITIAL_DRIVERS: Driver[] = [
  { id: 'DRV-001', name: 'Youssef Amrani', status: 'pending', plan: 'Pro', lastActive: '2 min ago', requests: 12 },
  { id: 'DRV-002', name: 'Karim Benali', status: 'active', plan: 'Free', lastActive: 'Online', requests: 45 },
  { id: 'DRV-003', name: 'Ahmed Tazi', status: 'suspended', plan: 'Enterprise', lastActive: '2h ago', requests: 89 },
];

const STATUS_STYLES: Record<DriverStatus, { bg: string; text: string }> = {
  active:    { bg: '#10b98120', text: '#34d399' },
  pending:   { bg: '#f59e0c20', text: '#fbbf24' },
  suspended: { bg: '#ef444420', text: '#f87171' },
};

export const AdminScreen: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);

  const approve = (id: string) =>
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, status: 'active' } : d));

  const toggleSuspend = (id: string) =>
    setDrivers(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status: d.status === 'active' ? 'suspended' : 'active' } : d,
      ),
    );

  return (
    <View style={styles.root}>
      <Header title="Admin Panel" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Driver Management</Text>
          {drivers.map(d => {
            const sc = STATUS_STYLES[d.status];
            return (
              <View key={d.id} style={styles.driverRow}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverId}>{d.id}</Text>
                  <Text style={styles.driverName}>{d.name}</Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.statusChip, { backgroundColor: sc.bg }]}>
                      <Text style={[styles.statusText, { color: sc.text }]}>{d.status.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.plan}>{d.plan}</Text>
                    <Text style={styles.lastActive}>{d.lastActive}</Text>
                  </View>
                </View>
                <View style={styles.driverActions}>
                  {d.status === 'pending' && (
                    <TouchableOpacity style={styles.approveBtn} onPress={() => approve(d.id)}>
                      <Text style={styles.approveBtnText}>Approve</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.suspendBtn, d.status === 'suspended' ? styles.restoreBtn : {}]}
                    onPress={() => toggleSuspend(d.id)}
                  >
                    <Text style={styles.suspendBtnText}>
                      {d.status === 'active' ? 'Suspend' : 'Restore'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Platform Summary</Text>
          {[
            { label: 'Total Drivers', val: drivers.length },
            { label: 'Active', val: drivers.filter(d => d.status === 'active').length },
            { label: 'Pending Approval', val: drivers.filter(d => d.status === 'pending').length },
            { label: 'Suspended', val: drivers.filter(d => d.status === 'suspended').length },
          ].map((s, i) => (
            <View key={i} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{s.label}</Text>
              <Text style={styles.summaryVal}>{s.val}</Text>
            </View>
          ))}
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
    gap: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginBottom: 4 },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  driverInfo: { flex: 1, gap: 4 },
  driverId: { fontSize: 11, color: COLORS.slate600, fontFamily: 'monospace' },
  driverName: { fontSize: 14, fontWeight: '600', color: COLORS.white },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  statusChip: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '700' },
  plan: { fontSize: 12, color: COLORS.slate300 },
  lastActive: { fontSize: 11, color: COLORS.slate600 },
  driverActions: { gap: 6 },
  approveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#10b981',
    borderRadius: 8,
  },
  approveBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  suspendBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ef444420',
    borderRadius: 8,
  },
  restoreBtn: { backgroundColor: '#3b82f620' },
  suspendBtnText: { fontSize: 12, fontWeight: '600', color: '#f87171' },
  statsCard: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  summaryLabel: { fontSize: 13, color: COLORS.slate400 },
  summaryVal: { fontSize: 14, fontWeight: '700', color: COLORS.white },
});
