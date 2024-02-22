import { create } from 'zustand'

export const useAsideMenuStore = create((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))
