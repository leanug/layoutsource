import { create } from 'zustand'

export const useDesignsStore = create((set) => ({
  designs: [],
  setDesigns: (newDesigns) => set({ designs: newDesigns }),
  incrementLikes: (designId) => {
    set((state) => {
      const updatedState = {
        designs: state.designs.map((design) =>
          design.id === designId ? { ...design, likes: design.likes + 1 } : design
        ),
      };
      console.log('Increment:', updatedState, designId);
      return updatedState;
    });
  },
  decrementLikes: (designId) => {
    set((state) => {
      const updatedState = { 
        designs: state.designs.map((design) =>
          design.id === designId && design.likes > 0 ? { ...design, likes: design.likes - 1 } : design
        ),
      }
      console.log('decrement', updatedState, designId)
      return updatedState
    })
  },
}))