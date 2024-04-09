import Image from 'next/image'
import { useCallback } from 'react'

import { DesignLikeButton } from '@/components'
import fallbackImg from '@/assets/images/default.png'
import { OpenCollectionsButton } from '@/components/buttons/open-collections-button'
import { useModalStore } from '@/store'
import { useAuth } from '@/hooks'
import { Collections } from '@/containers'
import Link from 'next/link'

/**
 * Displays a design card with its buttons for logged users
 */
export default function Design(props) {
  const { design } = props
  const { handleModal } = useModalStore()
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

  // Loading or no design
  if (!design?.id) return null

  return (
    <div key={design.id}>
      <div className="transition h-full flex flex-col justify-between dark:text-white">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <Link href={`/showcase/${design.slug}`}>
            <div
              className={`
                aspect-[3/4] overflow-hidden w-full bg-gray-500 
                origin-top cursor-pointer rounded-lg border border-gray-10 
                dark:border-gray-600
              `}
            >
              {design?.image ? (
                <Image
                  src={
                    design?.cover && design.cover?.url
                      ? design.cover?.url
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
          </Link>
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
        <Link href={`/showcase/${design.slug}`}>
          <h2 className="text-gray-900 dark:text-white">{design.title}</h2>
        </Link>
      </div>
    </div>
  )
}
