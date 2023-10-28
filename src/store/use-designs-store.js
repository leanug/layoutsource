import create from 'zustand'
import { Layout } from '@/api';

const layoutCtrl = new Layout()

export const useDesignsStore = create((set) => ({
  designs: [],
  page: 1,
  setDesigns: (designs) => set({ designs: designs }),
  
  getByType: async (type = 'home-pages',  page = 1, sorting) => {
    // Replace this with your actual API request
    const newData = await layoutCtrl.getDesignsByType({ type, page });
    console.log('new Data', newData);
    set({ designs: newData });
  },
}))