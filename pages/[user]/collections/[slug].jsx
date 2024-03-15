import { useRouter } from 'next/router'

import { sanitizeQueryString } from '@/utils'
import { useAuth, useCollections } from '@/hooks'
import { Custom404, LoadingIndicator, PaginatedDesigns } from '@/components'
import { Collection } from '@/api'

const collectionCtrl = new Collection()

/**
 * Render collection page by slug
 * @returns
 */
export default function CollectionPage() {
  const { user } = useAuth()

  const router = useRouter()
  const { user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)
 
  const {
    description,
    designs,
    collectionExists,
    initialFetch,
    handlePage,
    handleDeleteCollection,
    handleEditCollection,
    totalPages,
    totalItems,
    loading,
    page,
    title,
  } = useCollections(user, router, collectionCtrl)

  if (!user) {
    return <LoadingIndicator />
  }

  if (!collectionExists || safeUserSlug !== user?.username) {
    router.push('/404')
  }

  return (
    <>
      {designs?.length ? (
        <section className="section-full mb-8">
          <div className="mb-3 gap-8 flex-row flex items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-xl">{title}</h1>
              <button onClick={handleEditCollection}>Edit</button>
              <button onClick={handleDeleteCollection}>Delete</button>
            </div>
            <div className="flex flex-row items-center gap-3">
              <span className="w-40 text-right">
                {totalItems} {totalItems === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>
          <p>{description}</p>
        </section>
      ) : null}

      {initialFetch ? (
        <PaginatedDesigns
          designs={designs || []}
          loading={loading}
          totalPages={totalPages || 0}
          totalItems={totalItems || 0}
          page={page}
          handlePage={handlePage}
        />
      ) : (
        <div className="mt-20">
          <LoadingIndicator />
        </div>
      )}
    </>
  )
}
