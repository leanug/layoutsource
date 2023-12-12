import { useState } from "react"

import {
  AddCollection, 
  CollectionList, 
  CollectionButtons 
} from './'

import { UseCollection } from "@/hooks"

/**
 * Collection list for adding or deleting a design from a collection
 * It goes inside a modal
 */
export function Collections({ designId, userId, handleModal }) {
  const [
    isAddCollectionVisible, 
    setIsAddCollectionVisible
  ] = useState(false)

  const { 
    addDesign, 
    deleteDesign, 
    collections, 
  } = UseCollection(userId)

  const toggleComponents = () => {
    setIsAddCollectionVisible(! isAddCollectionVisible)
  }

  return (
    <>
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