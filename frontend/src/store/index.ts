import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressSettings {
  workdays: number[];
  workStartHour: number;
  workEndHour: number;
  salary: number;
}

interface AppState {
  isDark: boolean;
  salaryday: number;
  showSalary: boolean;
  progressSettings: ProgressSettings;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
  setSalaryday: (day: number) => void;
  setShowSalary: (showSalary: boolean) => void;
  setProgressSettings: (settings: Partial<ProgressSettings>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      salaryday: 0,
      showSalary: true,
      progressSettings: {
        workdays: [1, 2, 3, 4, 5],
        workStartHour: 9,
        workEndHour: 18,
        salary: 1000,
      },
      setIsDark: (isDark) => set({ isDark }),
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setSalaryday: (salaryday) => set({ salaryday }),
      setShowSalary: (showSalary) => set({ showSalary }),
      setProgressSettings: (settings) =>
        set((state) => ({
          progressSettings: { ...state.progressSettings, ...settings },
        })),
    }),
    {
      name: 'moyuban-storage',
    }
  )
);
