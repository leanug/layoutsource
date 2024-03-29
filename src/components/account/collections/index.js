import { UseCollection, useAuth } from '@/hooks'
import { CollectionList } from './collection-list'
import { NoResults, LoadMore } from '@/components'

export function Collections() {
  const { user } = useAuth()
  const { collections, incrementPage, pagination, page } = UseCollection(
    user?.id,
  )

  const { totalItems, totalPages } = pagination

  if (!collections?.length) {
    return <NoResults text="You don't have any collections" />
  }

  return (
    <>
      <CollectionList collections={collections} />
      <LoadMore
        totalItems={totalItems}
        totalPages={totalPages}
        handlePage={incrementPage}
        page={page}
        message={'No more collections'}
      />
    </>
  )
}
