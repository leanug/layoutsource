import { useEffect, useState } from 'react'

import { UserLayout } from '@/api'
import { useLoading } from '@/hooks'

const layoutCtrl = new UserLayout()

export function useUserDesigns(userId) {
  const [page, setPage] = useState(1)
  const { loading, startLoading, stopLoading } = useLoading()
  const [designs, setDesigns] = useState([])

  useEffect(() => {
    ;(async () => {
      startLoading()
      try {
        const response = await layoutCtrl.get(userId, page)
        if (response.success) {
          setDesigns(response.data)
        }
      } finally {
        stopLoading()
      }
    })()
  }, [page])

  return {
    loading,
    designs,
  }
}
