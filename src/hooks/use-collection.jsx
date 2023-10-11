import { useEffect, useState, useMemo } from "react";
import { Collection } from "@/api";
import { useLoading } from ".";

const collectionCtrl = new Collection()

export function UseCollection (userId) {
  const [collections, setCollections] = useState([])
  const { startLoading, stopLoading, loading } = useLoading()
  //const memoizedCollections = useMemo(() => collections, [collections]);

  const getCollectionById = (collectionId) => {
    const collection = collections.find(collection => collection.id === collectionId)
    return collection
  }

  // Get collections
  useEffect(() => {
    (async () => {
      startLoading()
      console.log('useEffect collections fetched');
      const response = await collectionCtrl.getAll(userId)
      response?.data && setCollections(response.data)
      console.log('response', response?.data);
      stopLoading()
    })()
  }, [userId])  

  // Add a design to a collection
  const addDesign = async (collectionId, designId) => {
    console.log('collectionId=', collectionId)
    const collection = getCollectionById(collectionId)
    const collectionData = collection.attributes.designs.data;
    const designsIdAry = curDesignAry.map(design => design.id)
    const updatedCollection = {...collection}
    console.log('updatedCollections',updatedCollection)

    console.log('designsIdAry', designsIdAry)
    console.log('add Design')
    
    // Check if the design is in the collection
    if(collection) {
      
      
      try {
        const data = { designs: [...designsIdAry, designId] }
        const result = await collectionCtrl.add(collectionId, data)

        // Updata collection state if collections was updated
        if(result?.data) {
          

        }
        
        console.log('result', result);
        console.log('collection', collection);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  // Remove a design from a collection
  const deleteDesign = async (collectionId, designId, designsIdAry) => {
    console.log(collectionId, designId, designsIdAry);
  }

  return { 
    addDesign, 
    deleteDesign, 
    collections, 
    loading 
  }
}