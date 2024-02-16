import { 
  useEffect, 
  useState 
} from "react"

import {
  useFirstRender,
  useLoading
} from "@/hooks"
import { 
  useModalStore, 
  useNotificationStore, 
  useDesignsStore 
} from "@/store"
import { EditCollectionForm } from "@/containers"
import { ConfirmationDialog } from '@/components'

const PAGE_SIZE = 2; // Set to your desired number of items per page

/**
 * Fetch collection data by slug
 * @returns 
 */
export function useCollections(user, router, collectionCtrl) {
  const { firstRender } = useFirstRender()
  const { loading, startLoading, stopLoading } = useLoading()
  const { handleModal } = useModalStore()
  const { designs, setDesigns } = useDesignsStore()
  const { addNotification } = useNotificationStore()

  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
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

          const result = await collectionCtrl.getBySlug({
            userId: user['id'], 
            slug,
            page,
            itemsPerPage: PAGE_SIZE
          })

          if(result?.success) {
            const { data } = result
            console.log(data);
            setDesigns([...data?.designs] || []) 
            setTotalItems(data.totalDesigns)
            setTotalPages(Math.ceil(data.totalDesigns / PAGE_SIZE))
            setTitle(data.collectionTitle)
            setDescription(data.collectionDescription)
            setCollectionId(data.collectionId)
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

          const result = await collectionCtrl.getBySlug({
            userId: user['id'],  
            slug,
            page,
            itemsPerPage: PAGE_SIZE
          })
          
          if(result?.success) {
            const { data } = result
            setDesigns([...designs, ...data?.designs || []])
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
      const result = await collectionCtrl.delete(user?.id, collectionId)

      if(result?.success) {
        addNotification(result?.message || '', 'success')
        router.push(`/${ userSlug }/collections`)
      } else {
        addNotification(result?.error.message || '', 'error')
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