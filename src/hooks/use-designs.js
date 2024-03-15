// useDesigns.js
import { useEffect, useRef } from 'react'
import { useDesignsStore } from '@/store'
import { Layout } from '@/api'
import { useRouter } from 'next/router'

const layoutCtrl = new Layout()

export function useDesigns() {
  const currentPage = useRef(1)
  const firstRender = useRef(true)
  const router = useRouter()
  const { sortBy, setDesigns, setPagination, page, setPage, setLoading } =
    useDesignsStore()

  const { type, category } = router.query

  console.count('useDesigns')
  console.log('firstRender.current', firstRender.current)

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [category, type, sortBy, setPage])

  useEffect(() => {
    console.log('firstRender', firstRender.current)
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
          setDesigns(result.data?.designs || [])
          page === 1 && setPagination(result.data?.pagination || {})
          currentPage.current = page
          console.log(result.data?.pagination)
        } else {
          setDesigns([])
          setPagination({})
          currentPage.current = 1
        }
      } catch (error) {
        setDesigns([])
        setPagination({})
        currentPage.current = 1
      } finally {
        setLoading(false)
      }
    })()

    firstRender.current = false
  }, [type, category, page, sortBy])

  useEffect(() => {
    console.log('type:', type, ' - IM THE ONE CHANGING TYPE!')
  }, [type])

  useEffect(() => {
    console.log('category:', category, ' - IM THE ONE CHANGING CATEGORY!')
  }, [category])

  useEffect(() => {
    console.log('page:', page, ' - IM THE ONE CHANGING PAGE!')
  }, [page])

  useEffect(() => {
    console.log('sortBy:', sortBy, ' - IM THE ONE CHANGING SORTBY!')
  }, [sortBy])
}
