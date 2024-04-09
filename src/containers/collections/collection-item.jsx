import { UseCollectionsModal } from '@/hooks'

export function CollectionItem(props) {
  const { addDesign, deleteDesign } = UseCollectionsModal()
  const { collectionId, collectionTitle, designId, handleModal, inCollection } =
    props

  return (
    <label
      className={`
        flex flex-row group gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg items-center px-4 py-3
        cursor-pointer
    `}
    >
      <input
        type="checkbox"
        checked={inCollection}
        className="checkbox checkbox-primary"
        onChange={() => {
          if (inCollection) {
            deleteDesign(collectionId, designId, handleModal)
          } else {
            addDesign(collectionId, designId, handleModal)
          }
        }}
      />
      <div className="w-full">{collectionTitle}</div>
    </label>
  )
}