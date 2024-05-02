// showcase-design/index.jsx
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

import {
  OpenCollectionsButton,
  DesignLikeButton,
  LoadingIndicator,
  NoResults,
} from '@/components'
import { Collections } from '@/containers'
import Tags from './tags'
import DesignDetailes from './design-details'
import { useModalStore, useShowcaseStore } from '@/store'
import { useAuth } from '@/hooks'
import fallbackImg from '@/assets/images/default.png'

export function ShowcaseDesign({ design }) {
  const firstRender = useRef(true)
  const { user } = useAuth()
  const { handleModal } = useModalStore()
  const router = useRouter()
  const { handleShowcaseModal } = useShowcaseStore()

  // Close Showcase Modal design on page change
  useEffect(() => {
    if (!firstRender.current) {
      handleShowcaseModal(false)
    }

    firstRender.current = false
  }, [router, handleShowcaseModal])

  const loading = false
  // Open collections modal for creating or updating a collection
  const openCollectionsModal = () => {
    const content = (
      <Collections
        userId={user?.id}
        designId={design.id}
        handleModal={handleModal}
      />
    )
    // Open modal
    handleModal(true, content, 'Add this design to a collection')
  }

  let imgUrl, imgHeight, imgWidth

  if (design?.slug) {
    const img = design.image
    imgUrl = img?.url || fallbackImg
    imgHeight = img?.height || '300px'
    imgWidth = img?.width || '300px'
  }

  // Extracting tag information
  const tagsList = design?.tags.map((item) => {
    const { slug, title } = item.attributes
    return { slug, title }
  })

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )

  return design?.slug ? (
    <div className="flex justify-center mt-24 bg-white dark:bg-gray-900">
      <div className="inline-block">
        {/* Header */}
        <div
          className={`
            flex flex-row items-center justify-between mb-10 gap-5
          `}
        >
          <div
            className="hidden md:flex flex-row justify-between w-full bg-gray-50 
            dark:bg-gray-700 rounded-lg py-2.5 px-4"
          >
            <h1>{design.title}</h1>
            <a href={design.link} className="block font-bold">
              {design.link}
            </a>
          </div>
          {user ? (
            <div className="flex flex-row gap-2">
              <OpenCollectionsButton
                userId={user?.id}
                onClick={openCollectionsModal}
              />

              <DesignLikeButton
                designId={design.id}
                likes={design.likes}
                userId={user?.id}
              />
            </div>
          ) : null}
        </div>
        {/* End header */}

        {/* Design image */}
        <div className="relative">
          <Image
            src={imgUrl} // Path to your image in the public folder
            alt={design.title}
            width={imgWidth} // The width of the image in pixels
            height={imgHeight} // The height of the image in pixels
            className="object-fit  h-auto rounded-lg p-0 m-0" // Responsive image styles
            blurDataURL={imgUrl}
            placeholder="blur"
            priority={false}
          />
        </div>
        {/* End Design image */}

        <div className="h-10 w-full"></div>

        {/* Design data */}
        <div className="flex flex-col md:flex-row gap-10 w-full mx-auto">
          <div className="w-full">
            <Tags tags={tagsList} />
          </div>
          <div className="w-full">
            <DesignDetailes design={design} />
          </div>
        </div>
        {/* End Design data */}
      </div>
    </div>
  ) : (
    <NoResults text="Oops! No design found." />
  )
}
