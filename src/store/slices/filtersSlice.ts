export interface FilterConfig {
  minPrice: number;
  maxDist: number;
  minRating: number;
  minProf: number;
  nightMode: boolean;
  peakMode: boolean;
  ocr: boolean;
  retry: boolean;
}

export interface FiltersSlice {
  filters: FilterConfig;
  setFilter: <K extends keyof FilterConfig>(key: K, value: FilterConfig[K]) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: FilterConfig = {
  minPrice: 60,
  maxDist: 4,
  minRating: 4.5,
  minProf: 10,
  nightMode: false,
  peakMode: true,
  ocr: true,
  retry: true,
};

export const createFiltersSlice = (set: any, get: any): FiltersSlice => ({
  filters: DEFAULT_FILTERS,

  setFilter: (key, value) =>
    set((state: any) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
});
