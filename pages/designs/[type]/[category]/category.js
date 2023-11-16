import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { Layout } from "@/api"

import { useDesigns, useFirstRender } from "@/hooks"

import { 
  PageMenu, 
  PaginatedDesigns  
} from "@/components"

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
const DesignsByCategoryPage = (props) => {
  const { data } = props
  const { categories } = data || {}

  /* const { loading, fetchDesignsByType, designs } = useDesigns(layouts) */
  const { firstRender } = useFirstRender()
  const [page, setPage] = useState(1)
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('updatedAt')
  const [pagination, setPagination] = useState({})
  const router = useRouter()

  const { type, category } = router.query

  // Load designs on type page change
  useEffect(() => {
    (async () => {
      const newData = await layoutCtrl.getDesigns({ type, page: 1, sortBy: 'updatedAt', category })
      setPage(1)
      setSortBy('updatedAt')
      setDesigns(newData.designs)
      setPagination(newData.pagination)
    })()
  }, [category, type])

  // Load designs on type page change
  useEffect(() => {
    if(firstRender === false) {
      (async () => {
        const newData = await layoutCtrl.getDesigns({ type, page: 1, sortBy, category })
        setPage(1)
        setDesigns(newData.designs)
        setPagination(newData.pagination)
      })()
    }
  }, [sortBy])

  useEffect(() => {
    if(firstRender === false && page !== 1) {
      (async () => {
        const newData = await layoutCtrl.getDesigns({ type, page, sortBy, category })
        setDesigns([...designs, ...newData.designs])
      })()
    }
  }, [page])

  const handlePage = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleSorting = (sortBy) => {
    setSortBy(sortBy)
  }

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

// Define PropTypes for your component
DesignsByCategoryPage.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.array,
  }),
};

export default DesignsByCategoryPage