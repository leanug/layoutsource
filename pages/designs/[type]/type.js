import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { notFound } from 'next/navigation';

import { validTypes } from '@/utils'
import { useDesigns } from "@/hooks"
import { Error, PaginatedDesigns } from "@/components"
import { PageMenu } from '@/containers'
import { Layout } from '@/api'

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
  const router = useRouter()
  const { data } = props
  const { categories } = data || {}
  const category = 'all'

  const { type } = router.query

  const {
    error,
    designs, 
    pagination, 
    handleSorting, 
    handlePage,
    page,
    loading 
  } = useDesigns(router, layoutCtrl)
  
  // Check if the type is valid
  const isValidType = validTypes.includes(type);

  // Category not found
  if (! isValidType) {
    notFound();
  }

  if(error) {
    return <Error message={ error } />
  }

  return (
    <>
      <PageMenu 
        categorySlug={ category }
        type={ type }
        categories={ categories }
        designCount={ pagination?.totalItems || 0 }
        handleSorting={ handleSorting }
        displayCategories={ true }
      />
      <PaginatedDesigns 
        designs={ designs || [] } 
        loading={ loading }
        totalPages={ pagination?.totalPages || 0 }
        totalItems={ pagination?.totalItems || 0 }
        page={ page }
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