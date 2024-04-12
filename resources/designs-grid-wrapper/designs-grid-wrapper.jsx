import { DesignsGrid } from '@/containers'
import { LoadingIndicator, NoResults, LoadMore } from '@/components'
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

  return (
    <section className="section-full">
      {loading && page === 1 ? null : <DesignsGrid designs={designs} />}
      {/* Display loading indicator if loading */}
      {loading && (
        <div className="flex text-center items-center justify-center my-12 w-full h-full">
          <LoadingIndicator />
        </div>
      )}
      {/* Render MoreDesigns component if not loading */}
      {!loading && (
        <LoadMore
          totalItems={totalItems}
          totalPages={totalPages}
          handlePage={incrementPage}
          page={page}
          message="You've seen all the designs."
        />
      )}
      {/* // Render NoResults component if totalItems not available */}
      {typeof totalItems === 'number' && totalItems === 0 ? (
        <NoResults text={'No results found'} />
      ) : null}
    </section>
  )
}
