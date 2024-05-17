import { create } from 'zustand'

export const useShowcaseDesignStore = create((set) => ({
  isOpen: false,
  designData: {},
  handleShowcaseDesign: (isOpen, designData = {}) =>
    set({
      isOpen,
      designData,
    }),
}))
