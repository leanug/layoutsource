import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { sanitizeQueryString, sanitizeSlug } from '@/utils'
import { useCollections } from '@/hooks'
import { LoadMore, LoadingIndicator, AuthLayout } from '@/components'
import { DesignsGrid } from '@/containers'

/**
 * Render collection page by slug
 * @returns
 */
function CollectionPage() {
  const router = useRouter()
  const { slug, user: userSlug } = router.query
  const safeUserSlug = sanitizeQueryString(userSlug)
  const safeSlug = sanitizeSlug(slug)

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
  } = useCollections(safeUserSlug, safeSlug)

  return (
    <>
      <section className="section-full mb-8 mt-16">
        <div className="mb-3 gap-8 flex-row flex items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-xl mr-2">{title}</h1>
            <button className="btn btn-sm" onClick={handleEditCollection}>Edit</button>
            <button className="btn btn-sm" onClick={handleDeleteCollection}>Delete</button>
          </div>
          <div className="flex flex-row items-center gap-3">
            <span className="w-40 text-right">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
        <p>{description}</p>
      </section>

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
  return <AuthLayout>{page}</AuthLayout>
}

export default CollectionPage
