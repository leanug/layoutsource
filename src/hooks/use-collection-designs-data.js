'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

import axios from 'axios'

import { useDesignsStore, useNotificationStore } from '@/store'
import { sanitizeSlug } from '@/utils'

/*
 * Get paginated designs for a collection
 */
export function UseCollectionDesignsData(userId) {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const { designs, setDesigns } = useDesignsStore()

  const { addNotification } = useNotificationStore()
  const pathname = usePathname()

  const slug = pathname.split('/').pop()
  const safeSlug = sanitizeSlug(slug)

  const firstRender = useRef(true)
  const pageRef = useRef(1)

  // Reset values
  useEffect(() => {
    setPage(1)
    setCollection([])
    setDesigns([])
    setPagination({})
  }, [setPage, setDesigns])

  // Fetch a single collection
  useEffect(() => {
    if (!userId) return

    // Don't run on showcase design windon open
    if (/\/showcase\//.test(pathname)) return
    ;(async () => {
      setLoading(true)

      const data = {
        userId,
        slug: safeSlug,
        filterBy: 'findOne',
      }

      // Get single collection
      const response = await axios.post('/api/collections/get', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        setCollection(response.data.collections)
      } else {
        setCollection([])
      }
      setLoading(false)
    })()
  }, [addNotification, userId, safeSlug, pathname])

  // Fetch paginated designs from a collection
  useEffect(() => {
    // Avoid re renders and multiple data fetching
    if (firstRender.current && page === 1) {
      firstRender.current = false
      return
    }

    // Don't run on showcase design windon open
    if (/\/showcase\//.test(pathname)) return

    // Don't re render when design showcase window opens
    // on design card click
    if (pageRef.current >= page && page !== 1) {
      return // Avoid re-runs unless page is 1
    }

    if (!userId || !collection?.designs) {
      return
    }
    ;(async () => {
      setLoading(true)

      const data = {
        userId,
        filterData: collection.designs,
        filterBy: 'designId',
        page,
      }

      // Get single collection
      const response = await axios.post('/api/designs/get', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        const { designs, totalItems, totalPages } = response.data
        setDesigns(designs, page)
        page === 1 && setPagination({ totalItems, totalPages })
        pageRef.current = page
      } else {
        setDesigns([])
        setPagination({})
      }

      setLoading(false)
    })()
  }, [userId, page, setDesigns, addNotification, collection, pathname])

  /*
   * Increment page number
   */
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return {
    collection,
    designs,
    incrementPage,
    loading,
    page,
    pagination,
  }
}
