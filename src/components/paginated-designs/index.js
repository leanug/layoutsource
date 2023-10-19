import { GridLayouts } from "@/containers"
import { LoadingIndicator, NoResults } from "@/components"
import { MoreDesigns } from './more-designs'

/**
 * DisplayDesigns component displays a list of layouts based on the provided type.
 * It supports loading more layouts using a "Load More" button.
 *
 * @param {Object} props - Component props.
 * @param {number} [props.limit=45] - The number of layouts to display per page.
 * @param {string} props.type - The type of layouts to display.
 * @param {string} props.headerText - The header text to display above the layouts.
 * @returns {JSX.Element} React component.
 */
export function PaginatedDesigns (props) {
  const { loading, designs, totalPages, fetchDesigns } = props
  
  return (
    <section className="section-full">
      {
        designs?.length ? (
          <>
            <GridLayouts layouts={ designs } />
            {
              loading ? (
                <div className="flex text-center justify-items-center my-12">
                  <LoadingIndicator />
                </div>
              ) : null
            }
          </>
        ) : (
          <NoResults text="No layouts found." />
        )
      }
      <MoreDesigns 
        totalDesigns={ designs?.length }
        totalPages={ totalPages }
        fetchDesigns={ fetchDesigns }
      />
    </section>
  );
}