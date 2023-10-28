import create from 'zustand'

export const useDesignsStore = create((set) => ({
  designs: [],
  setDesigns: (designs) => set({ designs: designs })
}))