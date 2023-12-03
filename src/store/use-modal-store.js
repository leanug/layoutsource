import { create } from 'zustand';

export const useModalStore = create((set) => ({
  modal: false,
  modalContent: null,
  handleModal: (isOpen, content = null) => set({ 
    modal: isOpen, 
    modalContent: content 
  }),
}));
