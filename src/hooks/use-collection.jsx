import { useContext, useEffect, useState } from "react";
import { ENV } from "@/utils";
import { Collection } from "@/api";
import { useLoading } from ".";
import { NotificationContext } from "@/contexts";

const collectionCtrl = new Collection()

export function UseCollection (userId) {
  const [collections, setCollections] = useState([])
  const { startLoading, stopLoading, loading } = useLoading()
  let { handleNotification } = useContext(NotificationContext)

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
    const collection = collections.find(collection => collection.id === collectionId)
    return collection
  }

  // Add a design to a collection
  const addDesign = async (collectionId, designId, handleModal) => {
    // Get the target collection
    const collection = getCollectionById(collectionId) 
    // Get collection data
    const collectionData = collection.attributes.designs.data; 
    const collectionTitle = collection.attributes.title
    // Make array of designs ids that belong to the target collection
    const designsIdAry = collectionData.map(design => design.id) 

    // Check if the design is in the collection
    if(collection) {
      try {
        const data = { designs: [...designsIdAry, designId] }
        // Add design to target collection
        const result = await collectionCtrl.update(collectionId, data)
        
        // Update collection state if collections was updated
        if(result?.data) {
          handleNotification({
            message: `Saved in ${ collectionTitle }`,
            type: 'success'
          })
        } else {
          // Message for dev
          ENV.IS_DEV && console.error(`
            Error saving design id: ${ designId } in 
            ${ collectionTitle }. ${ result }
          `);
          // Message modal for user
          handleNotification({
            message: 'Oops! Something went wrong. Please try again later.',
            type: 'error'
          })
        }
      } catch (error) {
        // Message for dev
        ENV.IS_DEV && console.error(`
          Error saving design id: ${ designId } in 
          ${ collectionTitle }. ${ error }
        `);
        // Message modal for user
        handleNotification({
          message: 'Oops! Something went wrong. Please try again later.',
          type: 'error'
        })
      } finally {
        // Close collections modal
        handleModal()
      }
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
    const filteredDesignsIdAry = designsIdAry.filter(design => design.id === designId)
    
    // Check if the design is in the collection
    if(collection) {
      try {
        const data = { designs: [...filteredDesignsIdAry] }
        // Remove design from target collection
        const result = await collectionCtrl.update(collectionId, data)
        
        // Update collection state if collections was updated
        if(result?.data) {
          handleNotification({
            message: `Removed from ${ collectionTitle }`,
            type: 'success'
          })
        } else {
          ENV.IS_DEV && console.error(`
            Error removing design id: ${ designId } in 
            ${ collectionTitle }. ${ result }
          `);
          handleNotification({
            message: 'Oops! Something went wrong. Please try again later.',
            type: 'error'
          })
        }
      } catch (error) {
        ENV.IS_DEV && console.error(`
          Error removing design id: ${ designId } from 
          ${ collectionTitle }. ${ error }
        `);
        handleNotification({
          message: 'Oops! Something went wrong. Please try again later.',
          type: 'error'
        })
      } finally {
        handleModal()
      }
    }
  }

  return { 
    addDesign, 
    deleteDesign, 
    collections, 
    loading 
  }
}