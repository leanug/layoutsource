'use client'

import { UseCollection, useAuth } from '@/hooks'
import { CollectionList } from './collection-list'
import { LoadMore, LoadingIndicator } from '@/components'

export default function DisplayCollections() {
  const { user } = useAuth()
  const { collections, incrementPage, pagination, page, loading } =
    UseCollection(user?.id)

  const { totalItems, totalPages } = pagination

  if (loading && !collections?.length) {
    return (
      <div className="w-full flex justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  if (!loading && !collections?.length) {
    return <div>You don&apos;t have any collections</div>
  }

  return (
    <>
      <CollectionList collections={collections} />
      <LoadMore
        totalItems={totalItems}
        totalPages={totalPages}
        handlePage={incrementPage}
        page={page}
        message={'No more collections.'}
      />
    </>
  )
}
