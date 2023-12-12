import { useEffect, useState } from "react";
import { Collection } from "@/api";
import { useLoading } from ".";
import { useNotificationStore } from "@/store";

const collectionCtrl = new Collection()

export function UseCollection (userId) {
  const [collections, setCollections] = useState([])

  const { startLoading, stopLoading, loading } = useLoading()
  const { addNotification } = useNotificationStore()

  // Fetch all collections
  useEffect(() => {
    (async () => {
      startLoading()
      const response = await collectionCtrl.getAll(userId)
      response?.data && setCollections(response.data)
      stopLoading()
    })()
  }, [userId])

  // Get the target collection from the collections array
  const getCollectionById = (collectionId) => {
    const collection = collections.find(
      collection => collection.id === collectionId
    )

    return collection
  }

  // Add a design to a collection
  const addDesign = async (collectionId, designId, handleModal) => {
    // Get the target collection
    const collection = getCollectionById(collectionId) 
    // Get collection data
    const collectionData = collection.attributes.designs.data; 
    const collectionTitle = collection.attributes.title; 
    
    // Make array of designs ids that belong to the target collection
    const designsIdAry = collectionData.map(design => design.id) 

    // Check if the design is in the collection
    if(collection) {
      const data = { designs: [...designsIdAry, designId] }
      // Add design to target collection
      const response = await collectionCtrl.update(collectionId, data)

      response?.success
        ? addNotification(`Saved in ${ collectionTitle }`, 'success')
        : addNotification(response?.error.message || '', 'error')

      // Close collections modal - Pinterest style
      handleModal()
    }
  }

  // Remove a design from a collection
  const deleteDesign = async (collectionId, designId, handleModal) => {
    // Get the target collection
    const collection = getCollectionById(collectionId) 
    // Get collection data
    const collectionData = collection.attributes.designs.data; 
    const collectionTitle = collection.attributes.title
    // Make array of designs ids that belong to the target collection
    const designsIdAry = collectionData.map(design => design.id) 
    // Filter the design to be removed from a collection
    const filteredDesignsIdAry = designsIdAry.filter(
      design => design.id === designId
    )
    
    // Check if the design is in the collection
    if(collection) {
      const data = { designs: [...filteredDesignsIdAry] }
      // Remove design from target collection
      const response = await collectionCtrl.update(collectionId, data)
      
      response?.success
        ? addNotification(`Removed from ${ collectionTitle }`, 'success')
        : addNotification(response?.error.message || '', 'error')
      
      // Close collections modal - Pinterest style
      handleModal()
    }
  }

  return { 
    addDesign, 
    deleteDesign, 
    collections, 
    loading 
  }
}