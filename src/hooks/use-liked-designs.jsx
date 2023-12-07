import { useLoading, useFirstRender } from "@/hooks"
import { useState, useEffect } from "react"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useLikedDesigns(userId, likedDesignsCtrl) {
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  const { firstRender } = useFirstRender()
  const { loading, startLoading, stopLoading } = useLoading()
  
  // Load designs on page load
  useEffect(() => {
    (async () => {
      try {
        startLoading()
        const newData = await likedDesignsCtrl.get({ 
          userId,
          page,  
        })
        setDesigns(newData?.designs || []) 
        setPagination(newData?.pagination || {})
      } finally {
        stopLoading()
      }
    })()
  }, [])

  // Load more designs on page change
  useEffect(() => {
    if(! firstRender && page > 1) {
      (async () => {
        try {
          startLoading()
          const newData = await likedDesignsCtrl.get({ 
            userId,
            page, 
          })
          setDesigns([...designs, ...newData?.designs || []])
          setPagination(newData?.pagination || {})
        } finally {
          stopLoading()
        }
      })()
    }
  }, [page])

  const handlePage = () => {
    setPage(prevPage => prevPage + 1)
  }
  
  return {
    page,
    loading,
    designs,
    pagination,
    handlePage
  }
}