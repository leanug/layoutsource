'use client'

import { useState } from 'react'

//import { AddCollection, CollectionList, CollectionButtons } from '.'
import { UseCollectionDesignManager } from '@/hooks'
import { LoadingIndicator } from '@/components'
import { AddCollection, CollectionItem, CollectionButtons } from '.'

/**
 * Collection list for adding or deleting a design from a collection
 * It goes inside a modal
 */
export function Collections({ designId, userId }) {
  const [isAddCollectionVisible, setIsAddCollectionVisible] = useState(false)
  const { collections, loading, addDesign, deleteDesign } =
    UseCollectionDesignManager(userId)

  const toggleComponents = () => {
    setIsAddCollectionVisible(!isAddCollectionVisible)
  }

  return (
    <>
      <div className="max-h-[400px] mt-3.5 flex flex-col gap-6 justify-between overflow-y-auto min-h-44 max-w-3xl">
        {isAddCollectionVisible ? (
          <AddCollection userId={userId} designId={designId} />
        ) : (
          /* Collections list */
          <div className="grid grid-cols-1 gap-2 mt-5 mb-2">
            {collections.length > 0 ? (
              collections.map((collection) => {
                return (
                  <CollectionItem
                    collection={collection}
                    designId={designId}
                    key={collection._id}
                    addDesign={addDesign}
                    deleteDesign={deleteDesign}
                  />
                )
              })
            ) : loading ? (
              'Loading'
            ) : (
              <p>No collections yet.</p>
            )}
          </div>
          /* End Collections list */
        )}
        <CollectionButtons
          isAddCollectionVisible={isAddCollectionVisible}
          toggleComponents={toggleComponents}
        />
      </div>
    </>
  )
}
