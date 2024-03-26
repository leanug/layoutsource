import { useEffect, useState } from 'react'

import { Layout } from '@/api'

const layoutCtrl = new Layout()

export function useDesign(designSlug) {
  const [design, setDesign] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await layoutCtrl.getDesignBySlug(designSlug)
        if (response.success) {
          setDesign({
            ...response.data[0]?.attributes,
            id: response.data[0]?.id,
          })
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [setLoading, designSlug])

  return {
    design,
    loading,
  }
}
