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
  const { loading, designs, totalPages, totalItems, handlePage } = props
  
  loading && <LoadingIndicator />

  return (
    <section className="section-full">
      {
        totalItems ? (
          <>
            <GridLayouts layouts={designs} />

            {
              loading ? (
                <div className="flex text-center justify-items-center my-12">
                  <LoadingIndicator />
                </div>
              ) : (
                <MoreDesigns
                  totalDesigns={designs?.length}
                  totalPages={totalPages}
                  handlePage={handlePage}
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