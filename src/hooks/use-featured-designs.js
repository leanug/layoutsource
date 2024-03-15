import { useState, useEffect } from 'react'

import { Layout } from '@/api'

const layoutCtrl = new Layout()

export function useFeaturedDesigns() {
  const [featuredDesigns, setFeaturedDesigns] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await layoutCtrl.getFeatured()
      if (response.success) {
        setFeaturedDesigns(response.data)
      }
    })()
  }, [])

  return { featuredDesigns }
}
