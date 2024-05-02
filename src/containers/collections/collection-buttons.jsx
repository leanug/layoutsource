import { ArrowUturnLeftIcon, PlusIcon } from '@heroicons/react/24/solid'

export function CollectionButtons({
  isAddCollectionVisible,
  toggleComponents,
}) {
  return (
    <button onClick={toggleComponents} className="btn no-animation">
      {isAddCollectionVisible ? (
        <>
          <ArrowUturnLeftIcon className="h-6 w-6" />
          {' Back to Collections list'}
        </>
      ) : (
        <>
          <PlusIcon className="h-6 w-6" />
          {'Create a New Collection'}
        </>
        
      )}
    </button>
  )
}
