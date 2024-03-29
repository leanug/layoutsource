import { useEffect } from 'react'

import { Layout } from '@/api'
import { useDesignsStore } from '@/store'

const layoutCtrl = new Layout()

/**
 * Custom hook for fetching searched designs.
 * @returns {void}
 */
export function useSearchDesigns(query) {
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

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
          console.log('query', query);
          console.log('page', page);
          const result = await layoutCtrl.searchDesigns({
            queryString: query,
            page,
            sortBy,
          })
          if (result.success) {
            setDesigns(result.data?.designs || [])
            console.log('fetchin and saving', result.data?.designs);
            console.log('page=', page)
            page === 1 && setPagination(result.data?.pagination || {})
          } else {
            setDesigns([])
            setPagination({})
          }
        } finally {
          setLoading(false)
        }
      })()
    } else {
      setDesigns([])
      setPagination({})
    }
  }, [page, sortBy, query, setLoading, setDesigns, setPagination])
}
