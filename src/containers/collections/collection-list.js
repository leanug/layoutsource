import { CollectionItem } from './collection-item'

export function CollectionList({ designId, collections }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4">
        {
          collections.map((collection) => {
            const curDesignAry = collection.attributes.designs.data
            const imageUrl = curDesignAry[0]?.attributes.image.data.attributes.url || ''
            const collectionTitle = collection.attributes?.title || ''
            const inCollection = curDesignAry.some(
              design => design.id === designId
            )
            return (
              <CollectionItem 
                key={collection.id} 
                collection={ collection }
                addDesign={ (designId) => addDesign(designId) }
                inCollection={ inCollection }
                imageUrl={ imageUrl }
                collectionTitle={ collectionTitle }
              />
            )
          })
        }
      </div>
    </>
  )
}