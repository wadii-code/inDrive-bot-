export interface PermissionsState {
  accessibility: boolean;
  overlay: boolean;
  batteryOpt: boolean;
}

export interface PermissionsSlice {
  permissions: PermissionsState;
  onboardingDone: boolean;
  grantPermission: (key: keyof PermissionsState) => void;
  setOnboardingDone: (done: boolean) => void;
  allGranted: () => boolean;
}

export const createPermissionsSlice = (set: any, get: any): PermissionsSlice => ({
  permissions: { accessibility: false, overlay: false, batteryOpt: false },
  onboardingDone: false,

  grantPermission: (key) =>
    set((state: any) => {
      const updated = { ...state.permissions, [key]: true };
      const allDone = Object.values(updated).every(Boolean);
      return { permissions: updated, onboardingDone: allDone };
    }),

  setOnboardingDone: (done) => set({ onboardingDone: done }),

  allGranted: () => {
    const { permissions } = get();
    return Object.values(permissions).every(Boolean);
  },
});
