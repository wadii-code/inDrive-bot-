import { create } from 'zustand';
import { createBotSlice, BotSlice } from './slices/botSlice';
import { createFiltersSlice, FiltersSlice } from './slices/filtersSlice';
import { createLogsSlice, LogsSlice } from './slices/logsSlice';
import { createPermissionsSlice, PermissionsSlice } from './slices/permissionsSlice';

type AppStore = BotSlice & FiltersSlice & LogsSlice & PermissionsSlice;

export const useAppStore = create<AppStore>()((set, get) => ({
  ...createBotSlice(set),
  ...createFiltersSlice(set, get),
  ...createLogsSlice(set, get),
  ...createPermissionsSlice(set, get),
}));
