import { create } from 'zustand'

/* 
 * User data for the user profile, initial data comes from nextauth session
 */
export const useUserStore = create((set) => ({
  user: {
    email: '',
    username: '',
    _id: '',
    picture: '',
    bio: '',
    location: '',
  }, // Initial user object
  // Function to update the user object
  setUser: (newValue) =>
    set((state) => ({ user: { ...state.user, ...newValue } })),
}))
