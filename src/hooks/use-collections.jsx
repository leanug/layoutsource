import { 
  useEffect, 
  useState 
} from "react"

import {
  useFirstRender,
  useLoading
} from "@/hooks"

import { ConfirmationDialog } from '@/components'

import { useModalStore, useNotificationStore } from "@/store"
import { EditCollectionForm } from "@/containers"

/**
 * Fetch collection data by slug
 * @returns 
 */
export function useCollections(user, router, collectionCtrl) {
  const { firstRender } = useFirstRender()
  const { loading, startLoading, stopLoading } = useLoading()
  const { handleModal } = useModalStore()
  const { addNotification } = useNotificationStore()

  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [collectionId, setCollectionId] = useState(0)
  const [collectionExists, setCollectionExists] = useState(true)
  const [initialFetch, setInitialFetch] = useState(false)

  const { slug, user: userSlug } = router.query

  // Load more designs on page change
  useEffect(() => {
    if(user?.id && ! firstRender && ! initialFetch) {
      (async () => {
        try { 
          startLoading()

          const newData = await collectionCtrl.getBySlug({
            userId: user['id'], 
            slug,
            page, 
          })
          
          if(newData) {
            setDesigns([...newData?.designs] || []) 
            setTotalItems(newData.totalDesigns)
            setTotalPages(2)
            setTitle(newData.collectionTitle)
            setDescription(newData.collectionDescription)
            setCollectionId(newData.collectionId)
            setCollectionExists(true)
          } else {
            setCollectionExists(false)
          } 
        } finally {
          stopLoading()
          setInitialFetch(true)
        }
    })()
  }
  }, [user, firstRender])

  useEffect(() => {
    if(! firstRender && page > 1 && designs?.length < totalItems) {
      (async () => {
        try {
          startLoading()

          const newData = await collectionCtrl.getBySlug({
            userId: user['id'],  
            slug,
            page, 
          })
          
          if(newData) {
            setDesigns([...designs, ...newData?.designs || []])
            setPage(page)
          }
        } finally {
          stopLoading()
        }
    })()
  }
  }, [page])

  /**
   * Edit the current collection
   */
  const deleteCollection = async () => {
    try {
      startLoading()
      const response = await collectionCtrl.delete(user?.id, collectionId)

      if(response?.success) {
        addNotification(response?.message || '', 'success')
        router.push(`/${ userSlug }/collections`)
      } else {
        addNotification(response?.error.message || '', 'error')
      }
    } finally {
      stopLoading()
    }
  }

  // Open a delete collection modal
  const handleDeleteCollection = () => {
    const content = <ConfirmationDialog 
      handleModal={ handleModal }
      onConfirm={ deleteCollection }
    />
    
    // Open modal
    handleModal(true, content, 'Delete collection')
  }

  /**
   * Edit the current collection
   */
  const handleEditCollection = () => {
    const content = <EditCollectionForm 
      userId={ user?.id }
      collectionId={ collectionId } 
      title={ title }
      description={ description }
      collectionCtrl={ collectionCtrl }
      handleModal={ handleModal }
      setTitle={ setTitle }
      setDescription={ setDescription } 
    />
    
    // Open modal
    handleModal(true, content, 'Edit collection')
  }

  const handlePage = () => {
    setPage(prevPage => prevPage + 1)
  }

  return {
    totalPages,
    totalItems,
    title,
    description,
    initialFetch,
    page,
    collectionExists,
    loading,
    designs,
    handlePage,
    handleDeleteCollection,
    handleEditCollection,
    setTitle,
    setDescription
  }
}