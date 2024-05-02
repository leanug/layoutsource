import { create } from 'zustand'

export const useSubCategoriesStore = create((set) => ({
  subCategories: {},
  setSubCategories: (categorySlug, newSubCategories) =>
    set((state) => ({
      subCategories: {
        ...state.categories,
        [categorySlug]: newSubCategories,
      },
    })),
}))
