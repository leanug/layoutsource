import { useState } from "react"
import { GridLayouts } from "@/containers"
import Button from "../components/button"
import { LoadingIndicator } from "@/components"
import { usePaginatedData } from "@/hooks"

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
export function DisplayDesigns (props) {
  const { pagination, fetchDesigns, layouts, slug } = props
  const [layoutsData, setLayoutsData] = useState(layouts || [])
  const { loading, loadDesigns } = usePaginatedData(fetchDesigns)
  const [page, setPage] = useState(1)

  const handleLoadMore = async () => {
    const { data, error } = await loadDesigns({ slug: slug, page: (page + 1) });
    setPage(prevPage => prevPage + 1); // Increment the page when the button is clicked
  
    if (error) {
      // Handle errors if necessary
      console.error('Error loading more data:', error);
    } else if (data) {
      setLayoutsData(prevLayouts => [...prevLayouts, ...data]);
    } else {
      // Handle the case where response.data is undefined or empty
      console.error('No data in response');
    }
  };

  return (
    <>
      {
        layoutsData && layoutsData.length > 0 ? (
          <section className="w-full px-3 md:px-16">
            <GridLayouts layouts={layoutsData} page={0} />
            {loading ? (
              <div className="flex text-center justify-items-center my-12">
                <LoadingIndicator />
              </div>
            ) : (
              (layoutsData.length < pagination.total) ? (
                <div className="flex justify-center my-12">
                  <Button
                    type="secondary-gray"
                    onClick={ handleLoadMore }
                  >
                    Load More
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center my-12">
                  <p className="text-center">No more designs to show.</p>
                </div>
                
              )
            )}
          </section>
        ) : (
          null
        )
      }
    </>
  )
}