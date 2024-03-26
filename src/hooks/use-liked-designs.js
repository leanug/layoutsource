import { useEffect } from 'react'

import { useDesignsStore } from '@/store'
import { LikedDesigns as LikedDesignsService } from '@/api'

const likedDesignsCtrl = new LikedDesignsService()

/**
 * Custom hook for managing designs data and fetching new designs.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useLikedDesigns(userId) {
  const { setDesigns, page, setPagination, setLoading, setPage } =
    useDesignsStore()

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [page, setPage])

  // Load more designs on page change
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        console.log('page=', page, ' userId= ', userId)
        const result = await likedDesignsCtrl.get({
          userId,
          page,
        })
        if (result.success) {
          console.log(result)
          setDesigns(result.data?.designs || [])
          page === 1 && setPagination(result.data?.pagination || {})
        } else {
          setDesigns([])
          setPagination({})
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [page])
}
