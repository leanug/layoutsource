'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { useDesignsStore } from '@/store'
import { usePageData } from './use-page-data'

export function useDesigns() {
  const { designs, setDesigns } = useDesignsStore()
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 })
  const [sortBy, setSortBy] = useState('')

  const { filterData } = usePageData()
  // Reset values
  useEffect(() => {
    setPage(1)
    setDesigns([], 1) // Reset designs store data, it prevents the display of old designs
  }, [sortBy, setPage, setDesigns])

  useEffect(() => {
    if (filterData && filterData.length > 0) {
      ;(async () => {
        setLoading(true)

        const data = {
          filterBy: 'catOrSubCatId',
          filterData: [filterData],
          page,
          sortBy,
        }

        const response = await axios.post('/api/designs/get', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('response', response);
        if (response.status === 200) {
          const data = response.data
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

        setLoading(false)
      })()
    }
  }, [filterData, page, sortBy, setDesigns])

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
