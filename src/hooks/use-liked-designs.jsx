import { useLoading } from "@/hooks"
import { useState, useEffect } from "react"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useLikedDesigns(userId, likedDesignsCtrl) {
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  const { loading, startLoading, stopLoading } = useLoading()
  
  // Load more designs on page change
  useEffect(() => {
    console.log('useLikedDesigns effect triggered');
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