import { create } from 'zustand'

export const useDarkModeStore = create((set) => ({
  darkMode: true,
  setDarkMode: (value) => set({ darkMode: value }), // Function to update darkMode
}))
