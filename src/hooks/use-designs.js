import { useEffect } from 'react'

import { useDesignsStore } from '@/store'
import { Layout } from '@/api'
import { useRouter } from 'next/router'

const layoutCtrl = new Layout()

export function useDesigns() {
  const router = useRouter()
  const { categories, tag } = router.query
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [categories, sortBy, setPage, tag])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const result = await layoutCtrl.getDesigns({
          type: categories ? categories[0] : undefined,
          category:
            categories && categories.length === 2 ? categories[1] : undefined,
          tag: tag || undefined,
          page,
          sortBy,
        })
        if (result.success) {
          setDesigns(result.data?.designs || [])
          page === 1 && setPagination(result.data?.pagination || {})
        } else {
          setDesigns([])
          setPagination({})
        }
      } catch {
        setDesigns([])
        setPagination({})
      } finally {
        setLoading(false)
      }
    })()
  }, [categories, tag, page, sortBy, setDesigns, setLoading, setPagination])
}
