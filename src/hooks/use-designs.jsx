import { useLoading, useFirstRender } from "@/hooks"
import { useState, useEffect } from "react"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, 
 * and a function to load more designs.
 */
export function useDesigns(router, layoutCtrl) {
  const { loading, startLoading, stopLoading } = useLoading()
  const { firstRender } = useFirstRender()

  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [sortBy, setSortBy] = useState('updatedAt')
  const [error, setError] = useState(null)
  
  const { type, category } = router.query

  // Load designs on type or category page change
  useEffect(() => {
    (async () => {
      try {
        startLoading()
        const newData = await layoutCtrl.getDesigns({ 
          type, 
          page: 1, 
          sortBy: 'updatedAt', 
          category 
        })
        
        if(newData.error) {
          setError(newData.error)
          setPage(1)
          setDesigns([])
          setPagination([])
        } else {
          setError(null)
          setPage(1)
          setSortBy('updatedAt')
          setDesigns(newData?.designs || [])
          setPagination(newData?.pagination || [])
        }
      } finally {
        stopLoading()
      }
    })()
  }, [type, category])

  // Load designs on type page change
  useEffect(() => {
    if(firstRender === false) {
      (async () => {
        try {
          startLoading()
          const newData = await layoutCtrl.getDesigns({
            type,
            page: 1, 
            sortBy, 
            category 
          })
          if(newData.error) {
            setError(newData.error)
            setPage(1)
            setDesigns([])
            setPagination([])
          } else {
            setError(null)
            setPage(1)
            setDesigns(newData?.designs || [])
            setPagination(newData?.pagination || [])
          }
        } finally {
          stopLoading()
        }
      })()
    }
  }, [sortBy])

  // Load more designs on page change
  useEffect(() => {
    if(firstRender === false && page !== 1) {
      (async () => {
        try {
          startLoading()
          const newData = await layoutCtrl.getDesigns({ 
            type, 
            page, 
            sortBy, 
            category 
          })

          if(newData.error) {
            setError(newData.error)
            setPage(1)
            setDesigns([])
            setPagination([])
          } else {
            setError(null)
            setDesigns([...designs, ...newData?.designs || []])
          }
        } finally {
          stopLoading()
        }
      })()
    }
  }, [page])

  const handlePage = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleSorting = (sortBy) => {
    setSortBy(sortBy)
  }
  
  return {
    error,
    designs,
    page,
    loading,
    pagination,
    handlePage,
    handleSorting
  }
}