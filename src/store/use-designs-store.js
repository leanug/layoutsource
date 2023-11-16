import { create } from 'zustand'
import { Layout } from '@/api';

const layoutCtrl = new Layout()

export const useDesignsStore = create((set) => ({
  designs: [],
  loading: false,
  page: 1,
  sorting: 'views',
  type: 'home-pages',

  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),

  setDesigns: (designs) => set({ designs: designs }),
  
  getByType: async (type = 'home-pages',  page = 1, sorting = 'views') => {
    // Replace this with your actual API request
    const newData = await layoutCtrl.getDesignsByType({ type, page, sortBy: sorting });
    set({ designs: newData });
  },
}))