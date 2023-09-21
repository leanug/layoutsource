import { 
  DisplayDesigns, 
  DisplayCategories 
} from "@/components/shared"

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
    layouts, 
    type,
    categorySlug,
    categories, 
    pagination 
  } = data || {}
  
  // Check if there are layouts. If not, display a message.
  if (! layouts ) {
    return (
      <>
        <p>No data available.</p>
      </>
    );
  }

  return (
    <>
      <DisplayCategories 
        type={ type }
        categorySlug={ categorySlug }
        categories={ categories }
      />
      <DisplayDesigns 
        layouts={ layouts } 
        type={ type }
        pagination={ pagination }
      />
    </>
  )
}

export default DesignsByCategoryPage