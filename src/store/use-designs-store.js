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
  sortBy: 'updatedAt',
  category: null,
  query: '',

  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  setPagination: (pagination) => set({ pagination }),
  setPage: (page) => set({ page }),
  setSortBy: (sortBy) => set({ sortBy }),

  setDesigns: (newDesigns, page) =>
    set((state) => ({
      designs: page === 1 ? newDesigns : [...state.designs, ...newDesigns],
    })),

  incrementLikes: (designId) => {
    set((state) => {
      const updatedState = {
        designs: state.designs.map((design) =>
          design._id === designId
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
          design._id === designId && design.likes > 0
            ? { ...design, likes: design.likes - 1 }
            : design,
        ),
      }
      return updatedState
    })
  },
}))
