import { create } from 'zustand'

/**
 * Designs Store manages the state related to designs fetched from the API.
 * It includes the designs array, pagination information, and functions to update the state.
 *
 * @typedef {Object} DesignsStore
 * @property {Array} designs - An array containing the designs fetched from the API.
 * @property {Object} pagination - An object representing the pagination information.
 * @property {number} pagination.currentPage - The current page number.
 * @property {number} pagination.totalPages - The total number of pages.
 * @property {number} pagination.totalItems - The total number of designs.
 * @property {Function} setDesigns - A function to set the designs in the store.
 * @property {Function} setPagination - A function to set the pagination information in the store.
 * @property {Function} setLoading - A function to set the loading state in the store.
 * @property {Function} setPage - A function to set the current page number in the store.
 * @property {Function} incrementPage - A function to increment the current page number in the store.
 * @property {Function} setSortBy - A function to set the sorting parameter in the store.
 */

export const useDesignsStore = create((set) => ({
  designs: [],
  error: null,
  loading: false,
  pagination: {},
  page: 1,
  sortBy: 'updatedAt',
  type: 'homepages',
  category: null,
  query: '',

  setType: (type) => set({ type }),
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  setLoading: (loading) => set({ loading }),
  setPagination: (pagination) => set({ pagination }),
  setPage: (page) => set({ page }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  setSortBy: (sortBy) => set({ sortBy }),
  setDesigns: (newDesigns) =>
    set((state) => ({
      designs:
        state.page === 1 ? newDesigns : [...state.designs, ...newDesigns],
    })),

  incrementLikes: (designId) => {
    set((state) => {
      const updatedState = {
        designs: state.designs.map((design) =>
          design.id === designId
            ? { ...design, likes: design.likes + 1 }
            : design,
        ),
      }
      return updatedState
    })
  },

  decrementLikes: (designId) => {
    set((state) => {
      const updatedState = {
        designs: state.designs.map((design) =>
          design.id === designId && design.likes > 0
            ? { ...design, likes: design.likes - 1 }
            : design,
        ),
      }
      return updatedState
    })
  },
}))
