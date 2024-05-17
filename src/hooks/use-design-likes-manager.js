'use client'

import { useState } from 'react'

import axios from 'axios'

import { useDesignsStore, useLikedDesignsStore, useUserStore } from '@/store'
import { ENV } from '@/utils'

/**
 * Custom hook for handling a design's likes counter and button logic
 *
 * @returns {JSX.Element} React component.
 */
export function useDesignLikesManager(designId, designLikes) {
  const { user } = useUserStore()
  const { addLikedDesign, deleteLikedDesign, likedDesigns } =
    useLikedDesignsStore()
  const { incrementLikes, decrementLikes } = useDesignsStore()
  const [loading, setLoading] = useState(false)

  const userId = user._id
  const isLikedDesign = Boolean(likedDesigns[designId])

  // Function to handle liking a design
  const handleLikeDesign = async () => {
    try {
      setLoading(true)

      // Add the liked design to likeddesigns collection
      const addDesignResponse = await axios.post(
        '/api/liked-designs/add',
        {
          userId,
          designId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (addDesignResponse.status !== 200) {
        throw new Error('Failed to add liked design')
      }

      // Update the value of likes in designs collection
      const updatedLikes = designLikes + 1

      const filter = { _id: designId }
      const update = { likes: updatedLikes }

      const updateDesignLikesResponse = await axios.post(
        '/api/designs/update',
        { filter, update },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (updateDesignLikesResponse.status !== 200) {
        throw new Error('Failed to update design likes')
      }

      // Add to the liked designs store
      const { data } = addDesignResponse

      const newLikedDesign = {
        [designId]: {
          documentId: data.newlikedDesignDocumentId,
          design: designId,
        },
      }

      addLikedDesign(newLikedDesign)
      incrementLikes(designId) // Update likes inside parent (grid-items)
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
      const documentId = likedDesigns[designId]?.documentId || ''

      // Delete the liked design from likeddesigns collection
      const deleteDesignResponse = await axios.delete(
        '/api/liked-designs/delete',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { filter: { _id: documentId } }, // Pass the body here
        },
      )

      if (deleteDesignResponse.status !== 200) {
        throw new Error('Failed to delete liked design')
      }

      // Update the value of likes in designs collection
      const updatedLikes = designLikes > 0 ? designLikes - 1 : 0
      const filter = { _id: designId }
      const update = { likes: updatedLikes }

      const updateDesignLikesResponse = await axios.post(
        '/api/designs/update',
        {
          filter,
          update,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (updateDesignLikesResponse.status !== 200) {
        throw new Error('Failed to update design likes')
      }

      decrementLikes(designId) // Update likes inside parent (grid-items)
      deleteLikedDesign(designId) // delete the design from the store
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
