import { useEffect, useState } from 'react'
import { useLoading } from '.'

import { Layout } from '@/api'

const layoutCtrl = new Layout()

export function useDesign() {
  const [design, setDesign] = useState({})
  const { loading, startLoading, stopLoading } = useLoading(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.href
      const designSlug = path.split('/').pop()

      ;(async () => {
        try {
          startLoading()
          const response = await layoutCtrl.getDesignBySlug(designSlug)
          if (response.success) {
            setDesign({
              ...response.data[0]?.attributes,
              id: response.data[0]?.id,
            })
          }
        } finally {
          stopLoading()
        }
      })()
    }
  }, [])

  return {
    design,
    loading,
  }
}
