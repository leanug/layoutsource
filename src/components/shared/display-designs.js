import { useState, useEffect } from "react"
import { Layout } from '@/api'
import { GridLayouts } from "@/components/shared"
import Button from "./button"
import Loading from "./loading"
import { useLoading } from "@/hooks"

const layoutCtrl = new Layout()

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
  const { loading, startLoading, stopLoading } = useLoading()
  const { category, type, layouts } = props
  const [layoutsData, setLayoutsData] = useState(layouts || [])
  // Track if there are more layouts to load
  const [hasMoreLayouts, setHasMoreLayouts] = useState(true); 
  const [page, setPage] = useState(1)

  // Awaits for page to update before calling loadLayouts()
  useEffect(() => {
    if (page > 1) loadLayouts(); // Load layouts when the component mounts
  }, [page]); // Re-run the effect when the page changes
  
  const loadLayouts = async () => {
    let response

    try {
      startLoading()
      await new Promise(resolve => setTimeout(resolve, 2000));


      if (type) {
        response = await layoutCtrl.getLayoutsByType({
          type,
          page // Use the current page
        });
      }
        
      if (category) {
        response = await layoutCtrl.getLayoutsByCategory({
          category,
          page // Use the current page
        });
      }

      // Check if the response contains new layouts
      if (response?.data.length > 0) {
        // Append the new layouts to the existing ones
        setLayoutsData(prevLayouts => [...prevLayouts, ...(response.data)]);
      } else {
        // No more layouts to load, disable the "Load More" button
        setHasMoreLayouts(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading()
    }
  }
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment the page when the button is clicked
  };

  return (
    <>
      {
        layouts && layouts.length > 0 ? (
          <section className="w-full px-3 md:px-16">
            <GridLayouts layouts={layoutsData} page={0} />
            {loading ? (
              <div className="flex text-center justify-items-center my-12">
                <Loading />
              </div>
            ) : (
              hasMoreLayouts && (
                <div className="flex justify-center my-12">
                  <Button
                    type="secondary-gray"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
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