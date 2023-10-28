import { 
  PageMenu, 
  PaginatedDesigns  
} from "@/components"
import PropTypes from 'prop-types'
import { useDesigns } from "@/hooks"
import { useEffect } from 'react'
import { useFirstRender } from "@/hooks/use-first-render"

/**
 * PageTypePage component displays a page with categories and designs based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.data - The data containing layouts, type, categories, and pagination.
 * @param {Array} [props.data.layouts] - An array of layout data to display.
 * @param {string} props.data.type - The type of layouts to display.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @param {Object} [props.data.pagination] - Pagination data for layouts.
 * @returns {JSX.Element} React component.
 */
const DesignsByTypePage = (props) => {
  console.log(props);
  /* return <div>No data yet</div> */

  const { data } = props
  const { 
    designs: layouts, 
    type, 
    categories, 
    categorySlug,
    pagination 
  } = data || {}
  const { loading, fetchDesignsByType, designs } = useDesigns(layouts)
  const { firstRender } = useFirstRender()
  console.log(props);
  // Load designs on type page change
  useEffect(() => {
    if(firstRender === false) {
      fetchDesignsByType(type, 1)
    }
  }, [type])
  
  // Check if there are layouts. If not, display a message.
  if (! designs ) {
    return (
      <>
        <p>No designs available.</p>
      </>
    );
  }

  return (
    <>
      <PageMenu 
        categorySlug={ categorySlug }
        type={ type }
        categories={ categories }
        designCount={ pagination?.total || 0 }
      />
      <PaginatedDesigns 
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination?.total || 0 }
        fetchDesigns={ () => fetchDesignsByType(type) }
      />
    </>
  )
}

// Define PropTypes for your component
DesignsByTypePage.propTypes = {
  data: PropTypes.shape({
    layouts: PropTypes.array,
    type: PropTypes.string.isRequired,
    categories: PropTypes.array,
    categorySlug: PropTypes.string,
    pagination: PropTypes.object,
  }),
};

export default DesignsByTypePage