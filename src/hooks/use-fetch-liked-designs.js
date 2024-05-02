'use client'

import { useEffect, useRef } from 'react'
import { useLikedDesignsStore } from '@/store'
import { arrayToObject } from '@/utils'

/**
 * Custom hook to fetch liked designs for a user.
 * @param {Object} user - The user object containing user information.
 * @param {Object} likedDesignsCtrl - Controller for managing liked designs.
 */
export const useFetchLikedDesigns = (userId) => {
  const dataFetched = useRef(false)
  const { setLikedDesigns } = useLikedDesignsStore()

  // Reset values
  useEffect(() => {
    dataFetched.current = false
  }, [userId])

  /**
   * useEffect to fetch and update liked designs when the user changes.
   */
  useEffect(() => {
    if (userId && !dataFetched.current) {
      ;(async () => {
        /**
         * Fetch liked designs for the user.
         * @returns {Promise<Object>} - Object with success status and data.
         *   @property {boolean} success - Indicates the success status of the operation.
         *   @property {Object} data - Object where keys are designIds and values are
         *     likedDesignCollectionItemIds.
         */
        const response = await fetch('/api/liked-designs/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (response.ok) {
          const data = await response.json()

          // Convert array of liked designs into an object for easy search
          const likedDesignsObj = arrayToObject(data.likedDesigns)

          setLikedDesigns(likedDesignsObj)
          dataFetched.current = true
        }
      })()
    }
  }, [userId, setLikedDesigns])
}
