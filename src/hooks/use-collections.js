'use client'

import { useEffect, useState, useRef } from 'react'

import axios from 'axios'

import { useUserStore } from '@/store'

/**
 * Custom hook for managing liked designs data and fetching new liked designs.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useCollections() {
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const { user } = useUserStore()
  const firstRender = useRef(true)

  // Reset values
  useEffect(() => {
    setPage(1)
    setCollections([])
  }, [setPage, setCollections])

  // Load more collections
  useEffect(() => {
    if (user._id !== '') {
      if (firstRender.current && page === 1) {
        firstRender.current = false
        return
      }

      ;(async () => {
        setLoading(true)

        console.log('fetch collections')

        const data = { userId: user._id, page, filterBy: 'getAll' }

        console.log('data', data)

        // '/api/collections/get' ----> ENV -----------------
        const response = await axios.post('/api/collections/get', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.status === 200) {
          const { collections, totalItems, totalPages } = response.data

          setCollections((prevCollections) => [
            ...prevCollections,
            ...collections,
          ])
          if (page === 1) {
            setPagination({ totalItems, totalPages })
          }
        } else {
          setCollections([])
          setPagination({})
        }
        setLoading(false)
      })()
    }
  }, [page, setLoading, setPagination, user._id, setCollections])

  const pageHandler = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return { collections, loading, pagination, page, pageHandler }
}
