'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { useNotificationStore } from '@/store'

export function UseCollectionData(userId, slug) {
  const [loading, setLoading] = useState(true)
  const { collection, setCollection } = useState([])

  const { addNotification } = useNotificationStore()

  // Fetch all collections
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      // Get single collection
      const response = await axios.post('/api/collections/get', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { userId, slug },
      })

      if (response.status === 200) {
        setCollection(response.data.collections)
      } else {
        setCollection({})
        addNotification({ message: 'Oops! An error occured', type: 'error' })
      }

      setLoading(false)
    })()
  }, [userId, slug, addNotification, setCollection])

  return { collection, loading }
}
