import { create } from 'zustand'

export const useMobileMenuStore = create((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))
