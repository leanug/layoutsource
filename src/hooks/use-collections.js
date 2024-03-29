import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks'
import { useModalStore, useNotificationStore } from '@/store'
import { EditCollectionForm } from '@/containers'
import { ConfirmationDialog } from '@/components'
import { Collection } from '@/api'
import { useRouter } from 'next/router'

const collectionCtrl = new Collection()

const PAGE_SIZE = 2 // Set to your desired number of items per page

/**
 * Fetch collection data by slug
 * @returns
 */
export function useCollections(userSlug, slug) {
  const { user } = useAuth()
  const router = useRouter()
  const { handleModal } = useModalStore()
  const [designs, setDesigns] = useState([])
  const { addNotification } = useNotificationStore()

  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [collectionId, setCollectionId] = useState(0)
  const [collectionExists, setCollectionExists] = useState(true)
 
  // Reset values
  useEffect(() => {
    setPage(1)
  }, [setPage])

  // Load more designs on page change
  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        setLoading(true)

        const response = await collectionCtrl.getBySlug({
          userId: user['id'],
          slug,
          page,
          itemsPerPage: PAGE_SIZE,
        })

        if (response?.success) {
          const { data } = response
          setDesigns((designs) => designs.concat(data?.designs))

          if (page === 1) {
            setTotalItems(data.totalDesigns)
            setTotalPages(Math.ceil(data.totalDesigns / PAGE_SIZE))
            setTitle(data.collectionTitle)
            setDescription(data.collectionDescription)
            setCollectionId(data.collectionId)
            setCollectionExists(true)
          }
        } else {
          setDesigns([])
          setCollectionExists(false)
          setTotalItems(0)
          setTitle('')
          setDescription('')
          setCollectionId(null)
          setCollectionExists(false)
        }
      } catch {
        setDesigns([])
      } finally {
        setLoading(false)
      }
    })()
  }, [user, page, setDesigns, slug])

  /**
   * Delete a collection
   */
  const deleteCollection = async () => {
    try {
      setLoading(true)
      const result = await collectionCtrl.delete(user?.id, collectionId)

      if (result?.success) {
        addNotification(result?.message || '', 'success')
        router.push(`/${userSlug}/collections`)
      } else {
        addNotification(result?.error.message || '', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  // Open a delete collection modal
  const handleDeleteCollection = () => {
    const content = (
      <ConfirmationDialog
        handleModal={handleModal}
        onConfirm={deleteCollection}
      />
    )

    // Open modal
    handleModal(true, content, 'Delete collection')
  }

  /**
   * Edit the current collection
   */
  const handleEditCollection = () => {
    const content = (
      <EditCollectionForm
        userId={user?.id}
        collectionId={collectionId}
        title={title}
        description={description}
        collectionCtrl={collectionCtrl}
        handleModal={handleModal}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    )

    // Open modal
    handleModal(true, content, 'Edit collection')
  }

  const handlePage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return {
    totalPages,
    totalItems,
    title,
    description,
    page,
    collectionExists,
    loading,
    designs,
    handlePage,
    handleDeleteCollection,
    handleEditCollection,
    setTitle,
    setDescription,
  }
}
