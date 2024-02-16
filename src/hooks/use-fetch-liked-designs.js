// useFetchLikedDesigns.js
import { useEffect } from 'react';
import { useLikedDesignsStore } from '@/store'

/**
 * Custom hook to fetch liked designs for a user.
 * @param {Object} user - The user object containing user information.
 * @param {Object} likedDesignsCtrl - Controller for managing liked designs.
 */
export const useFetchLikedDesigns = (user, likedDesignsCtrl) => {
  const { setLikedDesigns } = useLikedDesignsStore();

  /**
   * useEffect to fetch and update liked designs when the user changes.
   */
  useEffect(() => {
    if (user?.id) {
      (async () => { 
        /**
         * Fetch liked designs for the user.
         * @returns {Promise<Object>} - Object with success status and data.
         *   @property {boolean} success - Indicates the success status of the operation.
         *   @property {Object} data - Object where keys are designIds and values are
         *     likedDesignCollectionItemIds.
         */
        const result = await likedDesignsCtrl.getAll(user.id)
       
        if (result.success) {
          setLikedDesigns(result.data)
        }
      })()
    }
  }, [user]);

}