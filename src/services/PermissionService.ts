import { NativeModules, Platform } from 'react-native';
import { PermissionsState } from '../store/slices/permissionsSlice';

const { DriveBotPermissions } = NativeModules;

export const PermissionService = {
  async requestPermission(key: keyof PermissionsState): Promise<void> {
    if (Platform.OS !== 'android') return;

    switch (key) {
      case 'accessibility':
        await DriveBotPermissions?.openAccessibilitySettings?.();
        break;
      case 'overlay':
        await DriveBotPermissions?.requestOverlayPermission?.();
        break;
      case 'batteryOpt':
        await DriveBotPermissions?.requestIgnoreBatteryOptimizations?.();
        break;
    }
  },

  async checkPermission(key: keyof PermissionsState): Promise<boolean> {
    if (Platform.OS !== 'android') return true;
    try {
      switch (key) {
        case 'accessibility':
          return await DriveBotPermissions?.isAccessibilityEnabled?.() ?? false;
        case 'overlay':
          return await DriveBotPermissions?.canDrawOverlays?.() ?? false;
        case 'batteryOpt':
          return await DriveBotPermissions?.isIgnoringBatteryOptimizations?.() ?? false;
        default:
          return false;
      }
    } catch {
      return false;
    }
  },

  async checkAll(): Promise<PermissionsState> {
    const [accessibility, overlay, batteryOpt] = await Promise.all([
      PermissionService.checkPermission('accessibility'),
      PermissionService.checkPermission('overlay'),
      PermissionService.checkPermission('batteryOpt'),
    ]);
    return { accessibility, overlay, batteryOpt };
  },
};
