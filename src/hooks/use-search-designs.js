'use client'

import { useEffect, useState } from 'react'

import { useDesignsStore } from '@/store'

/**
 * Custom hook for fetching searched designs.
 * @returns {void}
 */
export function useSearchDesigns(query) {
  const { designs, setDesigns } = useDesignsStore()
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const { sortBy } = useDesignsStore()

  // Reset values
  useEffect(() => {
    setPage(1)
    setDesigns([])
  }, [setPage, query, sortBy, setDesigns])

  // Load more designs on page change
  useEffect(() => {
    // Check if query is not an empty string
    if (query !== '') {
      ;(async () => {
        try {
          setLoading(true)
          // SORTBY MISSING
          const response = await fetch('/api/designs/search', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ query, page, limit: 1 }),
          })
          if (response.ok) {
            const data = await response.json()
            setDesigns(data.designs, page)
            page === 1 &&
              setPagination({
                totalItems: data.totalItems,
                totalPages: data.totalPages,
              })
          } else {
            setDesigns([])
            setPagination({ totalItems: 0, totalPages: 0 })
          }
        } finally {
          setLoading(false)
        }
      })()
    } else {
      setDesigns([])
      setPagination({ totalItems: 0, totalPages: 0 })
    }
  }, [page, sortBy, query, setLoading, setDesigns])

  const pageHandler = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return { designs, loading, pagination, page, pageHandler }
}
