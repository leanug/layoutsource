export function CollectionButtons({
  isAddCollectionVisible,
  toggleComponents,
}) {
  return (
    <button onClick={toggleComponents} className="text-left font-medium">
      {isAddCollectionVisible
        ? '< Back to Collections list'
        : '+ Create a New Collection'}
    </button>
  )
}
