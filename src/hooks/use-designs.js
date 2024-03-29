import { useEffect } from 'react'

import { useDesignsStore } from '@/store'
import { Layout } from '@/api'
import { useRouter } from 'next/router'
import { getSafeTags } from '@/utils'

const layoutCtrl = new Layout()

export function useDesigns() {
  const router = useRouter()
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

  const { tags } = router.query

  // Reset values
  useEffect(() => {
    setPage(1)
    setLoading(true)
  }, [tags, sortBy, setPage])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const safeTags = getSafeTags(tags, 2)
        const result = await layoutCtrl.getDesigns({
          tags: safeTags,
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
  }, [tags, page, sortBy, setDesigns, setLoading, setPagination])
}
