import { useState } from 'react'

import { AddCollection, CollectionList, CollectionButtons } from '.'
import { UseCollectionsModal } from '@/hooks'
import { LoadingIndicator } from '@/components'

/**
 * Collection list for adding or deleting a design from a collection
 * It goes inside a modal
 */
export function Collections({ designId, userId, handleModal }) {
  const [isAddCollectionVisible, setIsAddCollectionVisible] = useState(false)

  const { collections } = UseCollectionsModal(userId)
  const toggleComponents = () => {
    setIsAddCollectionVisible(!isAddCollectionVisible)
  }

  // Loading
  if (!collections?.length)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )

  return (
    <>
      <div className="max-h-[400px] flex flex-col gap-10 overflow-y-auto max-w-3xl text-gray-950 dark:text-white">
        {isAddCollectionVisible ? (
          <AddCollection
            userId={userId}
            designId={designId}
            handleModal={handleModal}
          />
        ) : (
          <>
            {collections?.length ? (
              <CollectionList
                collections={collections}
                designId={designId}
                handleModal={handleModal}
                userId={userId}
              />
            ) : (
              <p>No collections yet.</p>
            )}
          </>
        )}
        <CollectionButtons
          isAddCollectionVisible={isAddCollectionVisible}
          toggleComponents={toggleComponents}
        />
      </div>
    </>
  )
}
