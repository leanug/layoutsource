import { create } from 'zustand';

export const useDarkModeStore = create((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: ! state.darkMode })),
}))