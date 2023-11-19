import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { useDesigns } from "@/hooks"

import { PaginatedDesigns } from "@/components"
import { PageMenu } from '@/containers'

import { Layout } from '@/api'

const layoutCtrl = new Layout()

/**
 * DesignsByCategoryPage component displays a page with categories 
 * and designs based on the provided data.
 *
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByCategoryPage = (props) => {
  const { data } = props
  const { categories } = data || {}

  const router = useRouter()
  const { type, category } = router.query

  const { 
    designs, 
    pagination, 
    handleSorting, 
    handlePage, 
    loading 
  } = useDesigns(router, layoutCtrl)

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
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination?.totalPages || 0 }
        handlePage={ handlePage }
      />
    </>
  )
}

DesignsByCategoryPage.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.array,
  }),
};

export default DesignsByCategoryPage