'use client'

import { useDesignsStore } from '@/store'
import { useEffect, useState } from 'react'

export function useDesigns(fetchDataId) {
  const { designs, setDesigns } = useDesignsStore()
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 })
  const [sortBy, setSortBy] = useState('')

  // Reset values
  useEffect(() => {
    setPage(1)
    setDesigns([], 1) // Reset designs store data, it prevents the display of old designs
  }, [fetchDataId, sortBy, setPage, setDesigns])

  useEffect(() => {
    if (fetchDataId) {
      ;(async () => {
        try {
          setLoading(true)

          /* categories && categories.length === 2 ? categories[1] : undefined,
            tag: tag || undefined,*/
          const response = await fetch('/api/designs/get-by-category', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ dataId: fetchDataId, page, sortBy }),
          })

          if (response.ok) {
            const data = await response.json()
            setDesigns(data.designs, page)
            if (page === 1) {
              setIsDataFetched(true)
              setPagination({
                totalItems: data.totalItems,
                totalPages: data.totalPages,
              })
            }
          } else {
            setDesigns([])
            setPagination({ totalItems: 0, totalPages: 0 })
          }
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [page, sortBy, fetchDataId, setDesigns])

  const pageHandler = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return {
    designs,
    loading,
    pagination,
    page,
    pageHandler,
    setSortBy,
    setPage,
    isDataFetched,
  }
}
