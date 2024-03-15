import { useLoading, useFirstRender } from '@/hooks'
import { useState, useEffect } from 'react'
import { useDesignsStore } from '@/store'
import { LikedDesigns as LikedDesignsService } from '@/api'

const likedDesignsCtrl = new LikedDesignsService()

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useLikedDesigns(userId) {
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  const { firstRender } = useFirstRender()
  const { loading, startLoading, stopLoading } = useLoading()

  const { designs, setDesigns } = useDesignsStore()

  // Load designs on page load
  useEffect(() => {
    ;(async () => {
      try {
        startLoading()
        const newData = await likedDesignsCtrl.get({
          userId,
          page,
        })
        setDesigns(newData?.data.designs || [])
        setPagination(newData?.data.pagination || {})
      } finally {
        stopLoading()
      }
    })()
  }, [])

  // Load more designs on page change
  useEffect(() => {
    if (!firstRender && page > 1) {
      ;(async () => {
        try {
          startLoading()
          const newData = await likedDesignsCtrl.get({
            userId,
            page,
          })
          setDesigns([...designs, ...(newData?.data.designs || [])])
          setPagination(newData?.data.pagination || {})
        } finally {
          stopLoading()
        }
      })()
    }
  }, [page])

  const handlePage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return {
    page,
    loading,
    designs,
    pagination,
    handlePage,
  }
}
