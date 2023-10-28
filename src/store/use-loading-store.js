import create from 'zustand'

export const useLoadingStore = create((set) => ({
  loading: false,
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false })
}))