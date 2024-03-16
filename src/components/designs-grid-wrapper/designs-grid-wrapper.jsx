import { DesignsGrid } from '@/containers'
import { LoadingIndicator, NoResults } from '@/components'
import { MoreDesigns } from './more-designs'
import { useDesignsStore } from '@/store'

/**
 * DisplayDesigns component displays a list of layouts based on the provided type.
 * It supports loading more layouts using a "Load More" button.
 *
 * @returns {JSX.Element} React component.
 */
export function DesignsGridWrapper() {
  const { designs, pagination, loading, page, incrementPage } =
    useDesignsStore()

  const { totalItems, totalPages } = pagination

  console.count('DesignsGridWrapper')

  return (
    <section className="section-full">
      {/* Display loading indicator if loading and totalItems not available */}
      {loading && !totalItems && (
        <div className="flex w-full justify-center items-center">
          <LoadingIndicator />
        </div>
      )}

      {/* Render designs if totalItems available */}
      {totalItems ? (
        <>
          <DesignsGrid designs={designs} />
          {/* Display loading indicator if loading */}
          {loading && (
            <div className="flex text-center items-center justify-center my-12 w-full h-full">
              <LoadingIndicator />
            </div>
          )}
          {/* Render MoreDesigns component if not loading */}
          {!loading && (
            <MoreDesigns
              totalItems={totalItems}
              totalPages={totalPages}
              handlePage={incrementPage}
              page={page}
            />
          )}
        </>
      ) : (
        // Render NoResults component if totalItems not available
        <NoResults text={'No results found'} />
      )}
    </section>
  )
}
