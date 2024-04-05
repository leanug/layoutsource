import { useEffect, useState } from 'react'

import { UserLayout } from '@/api'

const layoutCtrl = new UserLayout()

export function useUserDesigns(userId) {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [designs, setDesigns] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await layoutCtrl.get(userId, page)
        if (response.success) {
          setDesigns(response.data)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [page])

  return {
    loading,
    designs,
  }
}
