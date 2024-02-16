import { useState, useEffect } from "react"

import { useLoading, useFirstRender, useRenderCount } from "@/hooks"
import { useDesignsStore } from "@/store"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, 
 * and a function to load more designs.
 */
export function useDesigns(router, layoutCtrl) {
  const { loading, startLoading, stopLoading } = useLoading()
  const { firstRender } = useFirstRender()

  //const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [sortBy, setSortBy] = useState('updatedAt')
  const [error, setError] = useState(null)

  const { designs, setDesigns } = useDesignsStore()

  const { type, category } = router.query
  
  useRenderCount()

  // Load designs on type or category change
  useEffect(() => {
    (async () => {
      try {
        console.log('#1 useEffect', page);
        startLoading()
        const result = await layoutCtrl.getDesigns({ 
          type, 
          page: 1, 
          sortBy: 'updatedAt', 
          category 
        })
        
        if(result.success) {
          setError('')
          setPage(1)
          setSortBy('updatedAt')
          setDesigns(result.data?.designs || [])
          setPagination(result.data?.pagination || [])
        } else {
          setError('Error')
          setPage(1)
          setDesigns([])
          setPagination([])
        }
      } finally {
        stopLoading()
      }
    })()
  }, [type, category])

  // Load designs on sort by change
  useEffect(() => {
    if(firstRender === false) {
      (async () => {
        try {
          console.log('#2 useEffect', page)
          startLoading()
          const result = await layoutCtrl.getDesigns({
            type,
            page: 1, 
            sortBy, 
            category 
          })

          if(result.success) {
            setError(null)
            setPage(1)
            setDesigns(result.data?.designs || [])
            setPagination(result.data?.pagination || [])
          } else {
            setError(result.data.error)
            setPage(1)
            setDesigns([])
            setPagination([])
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
          console.log('#3 useEffect', page)
          startLoading()
          const result = await layoutCtrl.getDesigns({ 
            type, 
            page, 
            sortBy, 
            category 
          })

          if(result.success) {
            setError(null)
            setDesigns([...designs, ...result.data?.designs || []])
          } else {
            setError('Error')
            setPage(1)
            setDesigns([])
            setPagination([])
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