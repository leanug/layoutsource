import { CollectionItem } from './collection-item'

export function CollectionList ({ collections }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {
        collections.map(item => (
          <CollectionItem 
            key={ item.id } 
            item={ item } 
          />
        ))
      }
    </div>
  )
}