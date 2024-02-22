import { create } from 'zustand'

export const useFullSearchBarStore = create((set) => ({
  isOpen: false,
  toggleBar: () => set((state) => ({ isOpen: !state.isOpen })),
}))
