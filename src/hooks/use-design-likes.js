'use client'

import { useState } from 'react'

import { useDesignsStore, useLikedDesignsStore } from '@/store'
import { ENV } from '@/utils'

/**
 * Custom hook for handling a design's likes counter and button logic
 *
 * @returns {JSX.Element} React component.
 */
export function useDesignLikes(designId, designLikes, userId) {
  const { addLikedDesign, deleteLikedDesign, likedDesigns } =
    useLikedDesignsStore()
  const { incrementLikes, decrementLikes } = useDesignsStore()
  const [loading, setLoading] = useState(false)
  const isLiked = likedDesigns && likedDesigns[designId] ? true : false
  const [isLikedDesign, setIsLikedDesign] = useState(isLiked)

  // Function to handle liking a design
  const handleLikeDesign = async () => {
    try {
      setLoading(true)

      // Add the liked design to likeddesigns collection
      const addDesignResponse = await fetch('/api/liked-designs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, designId }),
      })

      if (!addDesignResponse.ok) {
        throw new Error('Failed to add liked design')
      }
      const addDesignResponseData = await addDesignResponse.json()

      // Update the value of likes in designs collection
      const updatedLikes = designLikes + 1
      const updateDesignLikesResponse = await fetch('/api/designs/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ designId, updates: { likes: updatedLikes } }),
      })

      if (!updateDesignLikesResponse.ok) {
        throw new Error('Failed to update design likes')
      }

      // Add to the liked designs store
      const { data } = addDesignResponseData
      const newLikedDesign = {
        [designId]: { documentId: data._id, design: designId },
      }

      addLikedDesign(newLikedDesign)
      incrementLikes(designId) // Update likes inside parent (grid-items)
      setIsLikedDesign(true) // Set is liked design
    } catch (error) {
      ENV.IS_DEV && console.error('Error:', error)
    } finally {
      setLoading(false) // Stop loading after data is fetched
    }
  }

  // Function to handle disliking a design
  const handleDislikeDesign = async () => {
    try {
      setLoading(true)
      const documentId = likedDesigns[designId]?._id

      // Delete the liked design to likeddesigns collection
      const deleteDesignResponse = await fetch('/api/liked-designs/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: documentId }),
      })

      if (!deleteDesignResponse.ok) {
        throw new Error('Failed to delete liked design')
      }

      // Update the value of likes in designs collection
      const updatedLikes = designLikes > 0 ? designLikes - 1 : 0
      const updateDesignLikesResponse = await fetch('/api/designs/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ designId, updates: { likes: updatedLikes } }),
      })

      if (!updateDesignLikesResponse.ok) {
        throw new Error('Failed to update design likes')
      }

      decrementLikes(designId) // Update likes inside parent (grid-items)
      deleteLikedDesign(designId) // delete the design from the store
      setIsLikedDesign(false) // Set is liked design
    } catch (error) {
      ENV.IS_DEV && console.error('Error:', error)
    } finally {
      setLoading(false) // Stop loading after data is fetched
    }
  }

  return {
    loading,
    isLikedDesign,
    handleLikeDesign,
    handleDislikeDesign,
  }
}
