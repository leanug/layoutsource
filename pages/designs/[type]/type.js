import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { Layout } from "@/api"

import { useDesigns } from "@/hooks"

import { 
  PageMenu, 
  PaginatedDesigns  
} from "@/components"

const layoutCtrl = new Layout()

/**
 * PageTypePage component displays a page with categories and designs 
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByTypePage = (props) => {
  const { data } = props
  const { categories } = data || {}
  const category = 'all'

  const router = useRouter()
  const { type } = router.query

  const { 
    designs, 
    pagination, 
    handleSorting, 
    handlePage, 
    loading 
  } = useDesigns(layoutCtrl, router)

  return (
    <>
      <PageMenu 
        categorySlug={ category }
        type={ type }
        categories={ categories }
        designCount={ pagination?.totalPages || 0 }
        handleSorting={ handleSorting }
      />
      <PaginatedDesigns 
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination?.totalPages || 0 }
        handlePage={ handlePage }
      />
    </>
  )
}

DesignsByTypePage.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.array,
  }),
};

export default DesignsByTypePage