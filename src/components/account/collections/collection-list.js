import { CollectionItem } from './collection-item'

/*
 * Render collections for the page collections
 */
export function CollectionList({ collections }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9">
      {collections.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  )
}
