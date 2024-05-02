'use client'

import { useEffect, useState } from 'react'

import { useNotificationStore } from '@/store'

export function UseCollectionDesignManager(userId) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotificationStore()

  // Fetch all collections
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/collections/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (response.ok) {
          const data = await response.json()
          setCollections(data.collections)
        } else {
          setCollections([])
        }
      } catch (error) {
        setCollections([])
      } finally {
        setLoading(false)
      }
    })()
  }, [userId])

  /*
   * Get the target collection from the collections array
   */
  const getCollectionById = (collectionId) => {
    const collection = collections.find(
      (collection) => collection._id === collectionId,
    )

    return collection
  }

  /*
   * Add a design to a collection
   */
  const addDesign = async (collectionId, designId) => {
    let collectionUpdated = false

    // Get the target collection
    const collection = getCollectionById(collectionId)

    // Check if the design is in the collection
    if (collection) {
      const filter = { _id: collectionId }
      const update = {
        designs: [...collection.designs, designId],
        totalDesigns: collection.totalDesigns + 1,
      }

      // Add design to target collection
      try {
        setLoading(true)
        const response = await fetch('/api/collections/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filter, update }),
        })

        // Check if the response is not ok and show an error notification
        if (!response.ok) {
          addNotification('Oops! An error occurred.', 'error')
        } else {
          collectionUpdated = true
        }
      } finally {
        // Ensure that loading state is always set to false, even if an error occurs
        setLoading(false)
      }
    }

    return collectionUpdated
  }

  /*
   * Remove a design from a collection
   */
  const deleteDesign = async (collectionId, designId) => {
    let collectionUpdated = false

    // Get the target collection
    const collection = getCollectionById(collectionId)

    // Filter the design to be removed from a collection
    const filteredDesignsIdAry = collection.designs.filter(
      (id) => id !== designId,
    )

    // Check if the design is in the collection
    if (collection) {
      const filter = { _id: collectionId }
      const update = {
        designs: [...filteredDesignsIdAry],
        totalDesigns: collection.totalDesigns - 1,
      }

      // Remove design from target collection
      try {
        setLoading(true)
        const response = await fetch('/api/collections/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filter, update }),
        })

        // Check if the response is not ok and show an error notification
        if (!response.ok) {
          addNotification('Oops! An error occurred.', 'error')
        } else {
          collectionUpdated = true
        }
      } finally {
        // Ensure that loading state is always set to false, even if an error occurs
        setLoading(false)
      }
    }

    return collectionUpdated
  }

  return {
    addDesign,
    collections,
    deleteDesign,
    loading,
  }
}
