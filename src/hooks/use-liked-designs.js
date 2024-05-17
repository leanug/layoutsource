'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useLikedDesignsStore, useUserStore } from '@/store'
import { arrayToObject } from '@/utils'

/**
 * Custom hook to fetch liked designs for a user.
 * @param {Object} user - The user object containing user information.
 * @param {Object} likedDesignsCtrl - Controller for managing liked designs.
 */
export const useLikedDesigns = () => {
  const { setLikedDesigns } = useLikedDesignsStore()
  const { user } = useUserStore()

  const pathname = usePathname()

  const hasFetchedData = useRef(false)

  /**
   * useEffect to fetch and update liked designs when the user changes.
   */
  useEffect(() => {
    // Load liked designs only once if likedDesigns is an empty object in the store
    // and user is logged in
    if (!hasFetchedData.current && user._id && !/\/showcase\//.test(pathname)) {
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
          body: JSON.stringify({ userId: user._id }),
        })

        if (response.ok) {
          const data = await response.json()

          // Convert array of liked designs into an object for easy search
          const likedDesignsObj = arrayToObject(data.likedDesigns)

          setLikedDesigns(likedDesignsObj)
          hasFetchedData.current = true
        }
      })()
    }
  }, [user._id, setLikedDesigns, pathname])
}
