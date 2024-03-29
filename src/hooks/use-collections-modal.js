import { useEffect, useState } from 'react'
import { Collection } from '@/api'
import { useNotificationStore } from '@/store'

const collectionCtrl = new Collection()

export function UseCollectionsModal(userId) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(false)

  const { addNotification } = useNotificationStore()

  // Fetch all collections
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const result = await collectionCtrl.getCollectionsList(userId)
        if (result?.success) {
          setCollections((collections) =>
            collections.concat(result.data.collections),
          )
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
      (collection) => collection.id === collectionId,
    )

    return collection
  }

  /*
   * Add a design to a collection
   */
  const addDesign = async (collectionId, designId, handleModal) => {
    // Get the target collection
    const collection = getCollectionById(collectionId)
    // Get collection data
    const collectionData = collection.attributes.designs.data
    const collectionTitle = collection.attributes.title
    const collectionTotalDesigns = collection.attributes.totalDesigns

    // Make array of designs ids that belong to the target collection
    const designsIdAry = collectionData.map((design) => design.id)

    // Check if the design is in the collection
    if (collection) {
      const data = {
        designs: [...designsIdAry, designId],
        totalDesigns: collectionTotalDesigns + 1,
      }

      // Add design to target collection
      const response = await collectionCtrl.update(collectionId, data)

      response?.success
        ? addNotification(`Saved in ${collectionTitle}`, 'success')
        : addNotification(response?.error.message || '', 'error')

      // Close collections modal - Pinterest style
      handleModal()
    }
  }

  /*
   * Remove a design from a collection
   */
  const deleteDesign = async (collectionId, designId, handleModal) => {
    // Get the target collection
    const collection = getCollectionById(collectionId)
    // Get collection data
    const collectionData = collection.attributes.designs.data
    const collectionTitle = collection.attributes.title
    const collectionTotalDesigns = collection.attributes.totalDesigns

    // Make array of designs ids that belong to the target collection
    const designsIdAry = collectionData.map((design) => design.id)

    // Filter the design to be removed from a collection
    const filteredDesignsIdAry = designsIdAry.filter((id) => id !== designId)

    // Check if the design is in the collection
    if (collection) {
      const data = {
        designs: [...filteredDesignsIdAry],
        totalDesigns: collectionTotalDesigns - 1,
      }

      // Remove design from target collection
      const response = await collectionCtrl.update(collectionId, data)

      response?.success
        ? addNotification(`Removed from ${collectionTitle}`, 'success')
        : addNotification(response?.error.message || '', 'error')

      // Close collections modal - Pinterest style
      handleModal()
    }
  }

  return {
    addDesign,
    collections,
    deleteDesign,
    loading,
  }
}
