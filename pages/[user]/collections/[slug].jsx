import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { sanitizeQueryString } from '@/utils'
import { useAuth, useAuthProtection, useCollections } from '@/hooks'
import { LoadMore, LoadingIndicator, UserLayout } from '@/components'
import { DesignsGrid } from '@/containers'

/**
 * Render collection page by slug
 * @returns
 */
function CollectionPage() {
  useAuthProtection()

  const { user, loading: userLoading } = useAuth()

  const router = useRouter()
  const { slug, user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)

  const {
    description,
    designs,
    handlePage,
    handleDeleteCollection,
    handleEditCollection,
    totalPages,
    totalItems,
    loading,
    page,
    title,
  } = useCollections(safeUserSlug, slug)

  useEffect(() => {
    // Invalid data
    if (!userLoading && (!safeUserSlug || safeUserSlug !== user?.username)) {
      //router.push('/404')
    }
  }, [router, safeUserSlug, user, userLoading])

  // Loading
  if (userLoading || !user) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
      {designs?.length ? (
        <section className="section-full mb-8 mt-16">
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

      <section className="section-full mb-8">
        <DesignsGrid designs={designs} />

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingIndicator />
          </div>
        ) : null}

        <LoadMore
          totalItems={totalItems}
          totalPages={totalPages}
          handlePage={handlePage}
          page={page}
        />
      </section>
    </>
  )
}

CollectionPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default CollectionPage
