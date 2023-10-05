import { useEffect, useState, useMemo } from "react"
import { Collection } from "@/api"
import { CollectionList, AddCollection, CollectionButtons } from './'
import { useLoading } from "@/hooks"
import { LoadingIndicator } from '@/components'

const collectionCtrl = new Collection()

export function Collections({ designId, userId, handleModal }) {
  const [collections, setCollections] = useState([])
  const [isAddCollectionVisible, setIsAddCollectionVisible] = useState(false);
  const { startLoading, loading, stopLoading } = useLoading()
 
  //const memoizedCollections = useMemo(() => collections, [collections]);

  const toggleComponents = () => {
    setIsAddCollectionVisible(! isAddCollectionVisible)
  }

  useEffect(() => {
    (async () => {
      startLoading()
      const response = await collectionCtrl.getAll(userId)
      response?.data && setCollections(response.data)
      stopLoading()
    })()
  }, [])  

  const addDesign = designId => {
    console.log('add design - designId=', designId)
  }

  return (
    <>
      <h1>Collections</h1>
      <div className="max-h-[400px] overflow-y-auto max-w-3xl">
        {
          isAddCollectionVisible ? (
            <AddCollection 
              userId={ userId } 
              designId={ designId } 
              handleModal={ handleModal }
            />
          ) : (
            <>
            {
              loading ? (
                <LoadingIndicator />
              ) : (
                <CollectionList
                  collections={ collections }
                  designId={ designId }
                  userId={ userId }
                />
              )
            }
            </>
          )
        }
        <CollectionButtons
          isAddCollectionVisible={ isAddCollectionVisible }
          toggleComponents={ toggleComponents }
        />
      </div>
    </>
  )
}