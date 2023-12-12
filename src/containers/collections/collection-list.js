import { CollectionItem } from './collection-item'

export function CollectionList (props) {
  const { 
    designId, 
    collections, 
    addDesign,
    deleteDesign, 
    handleModal
  } = props

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {
        collections.map((collection) => {
          const curDesignAry = collection.attributes.designs.data;
          const imageUrl = curDesignAry[0]?.attributes.cover.data.attributes.url || '';
          const collectionTitle = collection.attributes?.title || '';
          const collectionId = collection.id
          const inCollection = curDesignAry.some(
            (design) => design.id === designId
          );
          const designsIdAry = curDesignAry.map(design => design.id)
          
          return (
            <CollectionItem
              addDesign={ addDesign }
              collection={ collection }
              collectionTitle={ collectionTitle }
              collectionId={ collectionId }
              designId={ designId }
              designsIdAry={ designsIdAry }
              deleteDesign={ deleteDesign }
              handleModal={ handleModal }
              inCollection={ inCollection }
              imageUrl={ imageUrl }
              key={ collection.id }
            />
          );
        })
      }
    </div>
  )
}