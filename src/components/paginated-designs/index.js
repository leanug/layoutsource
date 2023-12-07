import { GridLayouts } from "@/containers"
import { LoadingIndicator, NoResults } from "@/components"
import { MoreDesigns } from './more-designs'

/**
 * DisplayDesigns component displays a list of layouts based on the provided type.
 * It supports loading more layouts using a "Load More" button.
 *
 * @returns {JSX.Element} React component.
 */
export function PaginatedDesigns (props) {
  const { 
    loading, 
    designs, 
    totalPages, 
    totalItems,
    page,
    handlePage 
  } = props
  
  loading && <LoadingIndicator />

  return (
    <section className="section-full">
      {
        totalItems ? (
          <>
            <GridLayouts designs={ designs } />
            {
              loading ? (
                <div className="flex text-center justify-items-center my-12">
                  <LoadingIndicator />
                </div>
              ) : (
                <MoreDesigns
                  totalItems={ totalItems }
                  totalPages={ totalPages }
                  handlePage={ handlePage }
                  page={ page }
                />
              )
            }
          </>
        ) : (
          <NoResults text={ 'No results found' } />
        )
      }
    </section>
  );
}