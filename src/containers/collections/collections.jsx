'use client'

import { useState } from 'react'

import { UseCollectionDesignManager } from '@/hooks'
import { LoadingIndicator } from '@/components'
import { AddCollection, CollectionItem, CollectionButtons } from '.'
import { useUserStore } from '@/store'

/**
 * Collection list for adding or deleting a design from a collection
 * It goes inside a modal
 */
export function Collections({ designId }) {
  const [isAddCollectionVisible, setIsAddCollectionVisible] = useState(false)

  const { user } = useUserStore()

  const { collections, loading, addDesign, deleteDesign } =
    UseCollectionDesignManager(user._id)

  const toggleComponents = () => {
    setIsAddCollectionVisible(!isAddCollectionVisible)
  }

  return (
    <>
      <div className="max-h-[400px] my-3.5 flex flex-col gap-6 justify-between overflow-y-auto min-h-44 max-w-3xl">
        {
          isAddCollectionVisible ? (
            <AddCollection userId={user._id} designId={designId} />
          ) : // Collections list
          collections.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 mt-5 mb-2">
              {collections.map((collection) => (
                <CollectionItem
                  collection={collection}
                  designId={designId}
                  key={collection._id}
                  addDesign={addDesign}
                  deleteDesign={deleteDesign}
                />
              ))}
            </div>
          ) : loading ? (
            <div className="w-full h-full">
              <LoadingIndicator centered={true} />
            </div>
          ) : (
            <p>No collections yet.</p>
          )
          // End Collections list
        }
        
      </div>
      <CollectionButtons
        isAddCollectionVisible={isAddCollectionVisible}
        toggleComponents={toggleComponents}
      />
    </>
  )
}
