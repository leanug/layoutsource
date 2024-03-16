import { useEffect } from 'react'

import { Layout } from '@/api'
import { useDesignsStore } from '@/store'

const layoutCtrl = new Layout()

/**
 * Custom hook for fetching searched designs.
 * @returns {void}
 */
export function useSearchDesigns() {
  const {
    sortBy,
    setDesigns,
    setPagination,
    page,
    query,
    setPage,
    setLoading,
  } = useDesignsStore()

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [setPage, query])

  // Load more designs on page change
  useEffect(() => {
    // Check if query is not an empty string
    if (query !== '') {
      ;(async () => {
        try {
          setLoading(true)
          const result = await layoutCtrl.searchDesigns({
            queryString: query,
            page,
            sortBy,
          })
          if (result.success) {
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
    }
  }, [page, sortBy, query, setLoading, setDesigns, setPagination])
}
