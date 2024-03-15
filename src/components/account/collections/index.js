import { UseCollection, useAuth } from '@/hooks'
import { CollectionList } from './collection-list'
import { NoResults } from '@/components'

export function Collections() {
  const { user } = useAuth()
  const { collections } = UseCollection(user?.id)

  if (!collections?.length) {
    return <NoResults text="You don't have any collections" />
  }

  return <CollectionList collections={collections} />
}
