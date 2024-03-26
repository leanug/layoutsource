import { useEffect } from 'react'

import { useDesignsStore } from '@/store'
import { Layout } from '@/api'
import { useRouter } from 'next/router'

const layoutCtrl = new Layout()

export function useDesigns() {
  const router = useRouter()
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

  const { tags } = router.query

  console.count('useDesigns')

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [tags, sortBy, setPage])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const result = await layoutCtrl.getDesigns({
          tags,
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
      } catch (error) {
        setDesigns([])
        setPagination({})
      } finally {
        setLoading(false)
      }
    })()
  }, [tags, page, sortBy, setDesigns, setLoading, setPagination])
}
