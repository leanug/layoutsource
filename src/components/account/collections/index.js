import { UseCollection } from "@/hooks"
import { CollectionList } from "./collection-list"

export function Collections () {
  const { collections } = UseCollection()

  return (
    <CollectionList collections={ collections } />
  )
}