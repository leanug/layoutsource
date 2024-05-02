'use client'

import { useEffect, useRef, useState } from 'react'

import { ENV } from '@/utils'

export function useCategories() {
  const isFetched = useRef(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/get')
        if (response.ok) {
          const data = await response.json()
          isFetched.current = true
          setCategories(data)
        } else {
          throw new Error('Failed to fetch categories')
        }
      } catch (error) {
        if (ENV.IS_DEV) console.error('Error fetching categories:', error)
        isFetched.current = false
        setCategories([])
      }
    }

    // Fetch categories only if they are not already cached for this type
    if (!isFetched.current) {
      fetchCategories()
    }
  }, [setCategories])

  return { categories }
}
