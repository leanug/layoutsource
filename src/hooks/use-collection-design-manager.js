'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { useNotificationStore, useCollectionStore, useUserStore } from '@/store'
import { ENV } from '@/utils'

export function UseCollectionDesignManager() {
  const [loading, setLoading] = useState(false)

  const { addNotification } = useNotificationStore()
  const { user } = useUserStore()
  const { collections, setCollections, addDesignStore, deleteDesignStore } =
    useCollectionStore()

  const isFetchedCollections = collections.length ? true : false

  // Fetch all collections
  useEffect(() => {
    if (!isFetchedCollections) {
      ;(async () => {
        try {
          setLoading(true)

          const data = {
            filterBy: 'getCollectionList',
            userId: user._id,
          }

          const response = await axios.post('/api/collections/get', data, {
            headers: { 'Content-Type': 'application/json' },
          })

          if (response.status === 200) {
            setCollections(response.data.collections)
          } else {
            setCollections([])
            throw new Error('Failed to fetch collections')
          }
        } catch (error) {
          ENV.IS_DEV && console.error('Error fetching collections:', error)
          addNotification({
            message: 'Failed to fetch collections',
            type: 'error',
          })
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [user._id, setCollections, isFetchedCollections, addNotification])

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
        addDesignStore(collectionId, designId) // Update collections zustand store
        collectionUpdated = true
      }

      // Ensure that loading state is always set to false, even if an error occurs
      setLoading(false)
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
          deleteDesignStore(collectionId, designId) // Update collections zustand store
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
