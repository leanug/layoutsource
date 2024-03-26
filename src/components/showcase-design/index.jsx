// showcase-design/index.jsx

import Image from 'next/image'

import {
  OpenCollectionsButton,
  DesignLikeButton,
  LoadingIndicator,
} from '@/components'
import { Collections, DesignsGrid } from '@/containers'
import Tags from './tags'
import Categories from './categories'
import DesignDetailes from './design-details'
import { useModalStore } from '@/store'
import { useAuth } from '@/hooks'
import fallbackImg from '@/assets/images/default.png'

export function ShowcaseDesign({ data }) {
  const { design, relatedDesigns } = data
  console.count('ShowcaseDesign')
  const { user } = useAuth()
  const { handleModal } = useModalStore()
  console.log(data);
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

  let designCategories = []
  let imgUrl, imgHeight, imgWidth

  if (design?.slug) {
    const img = design.image
    designCategories = design.categories || []
    imgUrl = img?.url || fallbackImg
    imgHeight = img?.height || '300px'
    imgWidth = img?.width || '300px'
  }

  // Extracting tag information
  const tagsList = design.tags.map((item) => {
    const { slug, title } = item.attributes
    return { slug, title }
  })

  return loading ? (
    <LoadingIndicator />
  ) : design?.slug ? (
    <>
      <div className="flex justify-center mt-28">
        <div className="inline-block">
          {/* Header */}
          <div
            className={`
          flex flex-row items-center justify-between mb-10  gap-5
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
          <div className="relative w-full">
            <Image
              src={imgUrl} // Path to your image in the public folder
              alt={design.title}
              width={imgWidth} // The width of the image in pixels
              height={imgHeight} // The height of the image in pixels
              className="object-cover w-full max-w-screen-2xl h-auto rounded-lg" // Responsive image styles
              blurDataURL={imgUrl}
              placeholder="blur"
              priority={false}
            />
          </div>
          {/* End Design image */}

          <div className="h-10 w-full"></div>

          {/* Design data */}
          <div className="flex flex-col md:flex-row gap-10 max-w-screen-2xl mx-auto">
            <div className="w-full">
              <Categories categories={designCategories} />
              <Tags tags={tagsList} />
            </div>
            <div className="w-full">
              <DesignDetailes design={design} />
            </div>
          </div>
          {/* End Design data */}
        </div>
      </div>
      {relatedDesigns.length > 1 ? (
        <section className="section-full mt-20">
          <h2 className="text-xl font-semibold mb-8">You might also like:</h2>
          <DesignsGrid designs={relatedDesigns} />
        </section>
      ) : null}
    </>
  ) : null
}
