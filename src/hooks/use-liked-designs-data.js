'use client'

import { useEffect, useMemo, useState, useRef } from 'react'

import axios from 'axios'

import { useLikedDesignsStore, useDesignsStore } from '@/store'

export function useLikedDesignsData() {
  const [page, setPage] = useState(1)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 })
  const [sortBy, setSortBy] = useState('')

  const { designs, setDesigns } = useDesignsStore()
  const { likedDesigns } = useLikedDesignsStore()

  const firstRender = useRef(true)

  //Array of liked design ids
  const filterData = useMemo(() => Object.keys(likedDesigns), [likedDesigns])

  // Reset values
  useEffect(() => {
    setPage(1)
    setDesigns([], 1) // Reset designs store data, it prevents the display of old designs
  }, [sortBy, setPage, setDesigns])

  useEffect(() => {
    if (filterData) {
      // Avoid re renders and multiple data fetching
      if (firstRender.current && page === 1) {
        firstRender.current = false
        return
      }

      ;(async () => {
        setLoading(true)

        const data = {
          filterBy: 'likedDesigns',
          filterData,
          page,
          sortBy,
        }
        console.log('data=', data)
        const response = await axios.post('/api/designs/get', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

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
    isDataFetched,
    loading,
    pagination,
    page,
    pageHandler,
    setSortBy,
    setPage,
  }
}
