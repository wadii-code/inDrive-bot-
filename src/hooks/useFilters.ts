import { useCallback } from 'react';
import { useAppStore } from '../store';
import { FilterConfig } from '../store/slices/filtersSlice';

export const useFilters = () => {
  const { filters, setFilter, resetFilters } = useAppStore();

  const updateFilter = useCallback(
    <K extends keyof FilterConfig>(key: K, value: FilterConfig[K]) => {
      setFilter(key, value);
    },
    [setFilter],
  );

  const toggleFilter = useCallback(
    (key: keyof Pick<FilterConfig, 'nightMode' | 'peakMode' | 'ocr' | 'retry'>) => {
      setFilter(key, !filters[key]);
    },
    [filters, setFilter],
  );

  return { filters, updateFilter, toggleFilter, resetFilters };
};
