import { create } from 'zustand'

export const useModalStore = create((set) => ({
  modal: false,
  modalContent: null,
  modalTitle: '',
  handleModal: (isOpen, content = null, title= '') => set({ 
    modal: isOpen, 
    modalContent: content,
    modalTitle: title
  }),
}));
