import { useEffect, useState } from 'react'
import { Collection } from '@/api'
import { useNotificationStore } from '@/store'

const collectionCtrl = new Collection()

export function UseCollection(userId) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  console.count('useCollection')
  const { addNotification } = useNotificationStore()

  // Reset values
  useEffect(() => {
    setPage(1)
  }, [setPage])

  // Fetch all collections
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const result = await collectionCtrl.getAll(userId, page)
        if (result?.success) {
          setCollections((collections) =>
            collections.concat(result.data.collections),
          )
          page === 1 && setPagination(result.data.pagination || {})
        } else {
          setCollections([])
        }
      } catch (error) {
        setCollections([])
        setPagination({})
        addNotification({
          message: 'Oops! There was an error retrieving the collections',
          status: 'error',
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [userId, page])

  /*
   * Increment page number
   */
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return {
    collections,
    incrementPage,
    loading,
    page,
    pagination,
  }
}
