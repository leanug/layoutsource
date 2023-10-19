import { Layout } from "@/api"
import { 
  PageMenu, 
  PaginatedDesigns  
} from "@/components"
import { useDesigns } from "@/hooks"
import { useFirstRender } from "@/hooks/use-first-render"
import { useEffect } from "react"

/**
 * PageTypePage component displays a page with categories and designs based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.data - The data containing layouts, type, categories, and pagination.
 * @param {Array} props.data.layouts - An array of layout data to display.
 * @param {string} props.data.type - The type of layouts to display.
 * @param {Array} props.data.categories - An array of category data to display.
 * @param {Object} props.data.pagination - Pagination data for layouts.
 * @returns {JSX.Element} React component.
 */
const DesignsByCategoryPage = (props) => {
  const { data } = props
  const { 
    designData, 
    type,
    categorySlug,
    categories, 
    pagination 
  } = data || {}
  const { loading, fetchDesignsByCategory, designs } = useDesigns(designData)
  const { firstRender } = useFirstRender()

  // Load designs on category page change
  useEffect(() => {
    if(firstRender === false)
      fetchDesignsByCategory(categorySlug, 1)
  }, [categorySlug])

  // Check if there are layouts. If not, display a message.
  if (! designs ) {
    return (
      <section className="section-full">
        <p>No data available.</p>
      </section>
    );
  }

  return (
    <>
      <PageMenu 
        type={ type }
        categorySlug={ categorySlug }
        categories={ categories }
        designCount={ pagination.total }
      />
      <PaginatedDesigns 
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination.total }
        fetchDesigns={ () => fetchDesignsByCategory(categorySlug) }
      />
    </>
  )
}

export default DesignsByCategoryPage