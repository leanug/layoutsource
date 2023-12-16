import { create } from 'zustand'

export const useShowcaseStore = create((set) => ({
  showcaseModal: false,
  showcaseModalContent: null,
  handleShowcaseModal: (isOpen, content = null) => set({ 
    showcaseModal: isOpen, 
    showcaseModalContent: content 
  }),
}));
