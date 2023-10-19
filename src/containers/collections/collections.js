import { useState } from "react"
import { CollectionList, AddCollection, CollectionButtons } from './'
import { UseCollection } from "@/hooks"
import { LoadingIndicator } from '@/components'

export function Collections({ designId, userId, handleModal }) {
  const [
    isAddCollectionVisible, 
    setIsAddCollectionVisible
  ] = useState(false)

  const { 
    addDesign, 
    deleteDesign, 
    collections, 
    loading 
  } = UseCollection(userId)

  const toggleComponents = () => {
    setIsAddCollectionVisible(! isAddCollectionVisible)
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
                collections?.length ? (
                  <CollectionList
                    addDesign={ addDesign }
                    collections={ collections }
                    deleteDesign={ deleteDesign }
                    designId={ designId }
                    handleModal={ handleModal }
                    userId={ userId }
                  />
                ) : (
                  <p>No collections yet.</p>
                )
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