import { Layout } from "@/api"
import { DisplayDesigns } from "@/containers"
import { DisplayCategories  } from "@/components"
import PropTypes from 'prop-types'

const layoutCtrl = new Layout()

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
  const { data } = props
  const { 
    layouts, 
    type: slug, 
    categories, 
    categorySlug,
    pagination 
  } = data || {}

  // Check if there are layouts. If not, display a message.
  if (! layouts ) {
    return (
      <>
        <p>No designs available.</p>
      </>
    );
  }

  return (
    <>
      <DisplayCategories 
        categorySlug={ categorySlug }
        type={ slug }
        categories={ categories }
      />
      <DisplayDesigns 
        layouts={ layouts } 
        slug={ slug }
        pagination={ pagination }
        fetchDesigns={ ({ slug, page }) => layoutCtrl.getLayoutsByType({ slug, page }) }
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