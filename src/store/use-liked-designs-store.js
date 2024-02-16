import { create } from 'zustand';

/* 
 * Local collection of liked designs 
 */
export const useLikedDesignsStore = create((set) => ({
  /**
   * This is an object for quick lookups
   * The object maps each design id (key) to its corresponding collection item id
   * (value) containing information about the liked design and user.
   */
  likedDesigns: {},
  
  setLikedDesigns: (data) => {
    set({ likedDesigns: data })
  },

  /* 
   * A liked design is added to the Liked designs collection in Strapi
   * The id of the collection field along with the id of the design's id are
   * returned.
   * Both values are stored
   */
  addLikedDesign: (data) => set((state) => {
    return {
      likedDesigns: { ...state.likedDesigns, ...data }
    };
  }),

  removeLikedDesign: (designId) => set((state) => {
    const updatedLikedDesigns = { ...state.likedDesigns };
    delete updatedLikedDesigns[designId];
    return {
      likedDesigns: updatedLikedDesigns
    }
  })
}))