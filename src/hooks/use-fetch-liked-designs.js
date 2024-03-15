// useFetchLikedDesigns.js
import { useEffect } from 'react'
import { useLikedDesignsStore } from '@/store'
import { LikedDesigns } from '@/api'

const likedDesignsCtrl = new LikedDesigns()

/**
 * Custom hook to fetch liked designs for a user.
 * @param {Object} user - The user object containing user information.
 * @param {Object} likedDesignsCtrl - Controller for managing liked designs.
 */
export const useFetchLikedDesigns = (userId) => {
  const { setLikedDesigns } = useLikedDesignsStore()
  console.count('useFetchLikedDesigns')
  /**
   * useEffect to fetch and update liked designs when the user changes.
   */
  useEffect(() => {
    console.count('fetch liked designs')
    if (userId) {
      ;(async () => {
        /**
         * Fetch liked designs for the user.
         * @returns {Promise<Object>} - Object with success status and data.
         *   @property {boolean} success - Indicates the success status of the operation.
         *   @property {Object} data - Object where keys are designIds and values are
         *     likedDesignCollectionItemIds.
         */
        const result = await likedDesignsCtrl.getAll(userId)

        if (result.success) {
          setLikedDesigns(result.data)
        }
      })()
    }
  }, [userId, setLikedDesigns])
}
