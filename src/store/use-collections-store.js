import { create } from 'zustand'

export const useCollectionStore = create((set) => ({
  collections: [],
  setCollections: (newCollections) => set({ collections: newCollections }),
  addDesignStore: (collectionId, designId) => {
    set((state) => {
      const updatedCollections = state.collections.map((collection) => {
        if (collection._id === collectionId) {
          return {
            ...collection,
            designs: [...collection.designs, designId],
            totalDesigns: collection.totalDesigns + 1,
          }
        }
        return collection
      })
      return { collections: updatedCollections }
    })
  },
  deleteDesignStore: (collectionId, designId) => {
    set((state) => {
      const updatedCollections = state.collections.map((collection) => {
        if (collection._id === collectionId) {
          return {
            ...collection,
            designs: collection.designs.filter((id) => id !== designId),
            totalDesigns: collection.totalDesigns - 1,
          }
        }
        return collection
      })
      return { collections: updatedCollections }
    })
  },
}))
