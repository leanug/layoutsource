import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { DesignLikeButton, ShowcaseDesign } from '@/components'
import Footer from './footer'
import fallbackImg from '@/assets/images/default.png'
import { OpenCollectionsButton } from '../../../resources/components/buttons/open-collections-button'
import { useModalStore, useShowcaseStore } from '@/store'
import { useAuth } from '@/hooks'
import { Collections } from '@/containers'

/**
 * Displays a design card with its buttons for logged users
 */
export default function Design(props) {
  const { design } = props
  const router = useRouter()
  const { handleModal } = useModalStore()
  const { showcaseModal, handleShowcaseModal } = useShowcaseStore()
  const { user } = useAuth()

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
      handleModal(true, content, 'Your collections')
    },
    [user, handleModal],
  )

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if (!showcaseModal) {
      window.history.pushState(null, null, router.asPath)
    }
  }, [showcaseModal, router])

  // Open a big modal for showcasing a big design
  const showcaseDesign = useCallback(
    (designSlug) => {
      // Use JavaScript history to navigate without page reload
      window.history.pushState(null, null, `/showcase/${designSlug}`)
      const data = { design, relatedDesigns: [] }
      const modalContent = (
        <div className="mb-20">
          <ShowcaseDesign design={data?.design} />
        </div>
      )

      handleShowcaseModal(true, modalContent)
    },
    [handleShowcaseModal, design],
  )

  // Loading or no design
  if (!design?.id) return null

  return (
    <div key={design.id}>
      <div className="transition h-full flex flex-col justify-between dark:text-white">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <div
            className={`
              aspect-[3/4] overflow-hidden w-full bg-gray-500 
              origin-top cursor-pointer rounded-lg border border-gray-10 
              dark:border-gray-600
            `}
            onClick={() => showcaseDesign(design.slug)}
          >
            {design?.image ? (
              <Image
                src={
                  design?.cover && design.cover?.url
                    ? design.cover.url
                    : fallbackImg
                }
                alt={design.title}
                className="w-full h-full object-cover mx-auto"
                style={{ objectPosition: 'top' }}
                width="0"
                height="0"
                sizes="100%"
                priority={true}
              />
            ) : null}
          </div>
          {user ? (
            <div
              className={`
                absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              `}
            >
              <div className="flex gap-2.5">
                <OpenCollectionsButton
                  designId={design?.id}
                  onClick={openCollectionsModal}
                />

                <DesignLikeButton
                  likes={design.likes}
                  designId={design.id}
                  userId={user?.id}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="row-span-1">
          <Footer
            slug={design.slug}
            title={design.title}
            likes={design.likes}
            views={design.views}
            showcaseDesign={showcaseDesign}
          />
        </div>
      </div>
    </div>
  )
}
