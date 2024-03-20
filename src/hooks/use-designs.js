import { useEffect } from 'react'

import { useDesignsStore } from '@/store'
import { Layout } from '@/api'
import { useRouter } from 'next/router'

const layoutCtrl = new Layout()

export function useDesigns() {
  const router = useRouter()
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

  const { type, category } = router.query

  console.count('useDesigns')

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [category, type, sortBy, setPage])

  useEffect(() => {
    ;(async () => {
      try {
        console.count('fetch designs useEffect')
        setLoading(true)
        const result = await layoutCtrl.getDesigns({
          type,
          page,
          sortBy,
          category,
        })
        if (result.success) {
          console.count('fetching liked designs')
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
  }, [type, category, page, sortBy, setDesigns, setLoading, setPagination])
}
