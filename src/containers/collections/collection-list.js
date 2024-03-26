import { CollectionItem } from './collection-item'

export function CollectionList(props) {
  const { designId, collections, handleModal } = props

  return (
    <div className="grid grid-cols-1 gap-4 mt-5">
      {collections.map((collection) => {
        const curDesignAry = collection.attributes.designs.data
        const collectionTitle = collection.attributes?.title || ''
        const collectionId = collection.id
        const inCollection = curDesignAry.some(
          (design) => design.id === designId,
        )
        const designsIdAry = curDesignAry.map((design) => design.id)

        return (
          <CollectionItem
            collection={collection}
            collectionTitle={collectionTitle}
            collectionId={collectionId}
            designId={designId}
            designsIdAry={designsIdAry}
            handleModal={handleModal}
            inCollection={inCollection}
            key={collection.id}
          />
        )
      })}
    </div>
  )
}
