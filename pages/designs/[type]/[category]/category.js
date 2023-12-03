import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { validTypes } from '@/utils'

import { useDesigns } from "@/hooks"

import { PaginatedDesigns, Error } from "@/components"
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
    error,
    designs, 
    pagination, 
    handleSorting, 
    handlePage, 
    loading 
  } = useDesigns(router, layoutCtrl)

  // Check if the type is valid
  const isValidType = validTypes.includes(type);

  if (!isValidType) {
    //router.push('/404')
    console.log(router);
    //return {notFound: true} // No flicker after push
    return null; // Optional: Return null to avoid rendering the component
  }

  if(error) {
    return <Error message={ error.message } />
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
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination?.totalPages || 0 }
        totalItems={ pagination?.totalItems || 0 }
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