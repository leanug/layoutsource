import { create } from 'zustand';

export const useShowcaseStore = create((set) => ({
  modal: false,
  modalContent: null,
  handleModal: (isOpen, content = null) => set({ 
    modal: isOpen, 
    modalContent: content 
  }),
}));
