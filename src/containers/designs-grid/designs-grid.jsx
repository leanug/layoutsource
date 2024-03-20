import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Design from './design'
import { Collections } from '@/containers'
import { useAuth } from '@/hooks'
import { ShowcaseDesign } from '@/components'
import { useModalStore, useShowcaseStore } from '@/store'

export function DesignsGrid({ designs }) {
  const { user } = useAuth()
  const router = useRouter()
  const { modal, handleModal } = useModalStore()
  const { handleShowcaseModal } = useShowcaseStore()

  console.count('DesignsGrid')

  // Open collections modal for creating or updating a collection
  const openCollectionsModal = useCallback(
    (designId) => {
      const content = (
        <Collections
          userId={user.id}
          designId={designId}
          handleModal={handleModal}
        />
      )
      // Open modal
      handleModal(true, content, 'Add this design to a collection')
    },
    [user, handleModal],
  )

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if (!modal) {
      window.history.pushState(null, null, router.asPath)
    }
  }, [modal, router])

  // Open a big modal for showcasing a big design
  const showcaseDesign = useCallback(
    (designSlug) => {
      // Use JavaScript history to navigate without page reload
      window.history.pushState(null, null, `/showcase/${designSlug}`)
      const modalContent = <ShowcaseDesign />

      handleShowcaseModal(true, modalContent)
    },
    [handleShowcaseModal],
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {designs?.map((item) => (
        <Design
          user={user}
          key={item.id}
          design={item}
          openCollectionsModal={openCollectionsModal}
          showcaseDesign={showcaseDesign}
        />
      ))}
    </div>
  )
}
