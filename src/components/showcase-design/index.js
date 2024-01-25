import { useDesign } from "@/hooks"

import { BookmarkSolid, DesignLikeButton } from '@/components'
import { Collections } from '@/containers'
import { LoadingIndicator } from "../loading-indicator"

import { useModalStore } from "@/store"

import Image from "next/image"

import fallbackImg from '@/assets/images/default.png'

export function ShowcaseDesign ({ userId }) {
  // useDesign gets the design data by fetching it using the url
  const { design, loading } = useDesign()
  
  const { handleModal } = useModalStore()

  // Open collections modal for creating or updating a collection
  const openCollectionsModal = () => {
    const content = <Collections 
      userId={ userId } 
      designId={ design.id }
      handleModal={ handleModal }
    />
    // Open modal
    handleModal(true, content, 'Add this design to a collection')
  }

  let designCategories = []
  let imgUrl, imgHeight, imgWidth, fonts
  
  if (design?.slug) {
    const img = design.image.data?.attributes
    designCategories = design.categories.data || []
    fonts = design?.fonts || []
    imgUrl = img?.url || fallbackImg
    imgHeight = img?.height || '300px'
    imgWidth = img?.width || '300px'
  }

  return (
    loading ? (
      <LoadingIndicator />
    ) : (
      design?.slug ? (
      <div className="flex justify-center">
        <div className="inline-block">
          <div className="flex flex-row justify-between mb-3.5">
            <h1>{ design.title }</h1>
            
            <div className="flex flex-row gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={ () => openCollectionsModal() }
              >
                <BookmarkSolid />
              </button>

              <DesignLikeButton 
                designId={ design.id }
                likes={ design.likes }
                userId={ userId }
              />
            </div>
          </div>

          <Image
            src={ imgUrl } // Path to your image in the public folder
            alt={ design.title }
            width={ imgWidth } // The width of the image in pixels
            height={ imgHeight } // The height of the image in pixels
            className="h-auto mx-auto"
            blurDataURL={ imgUrl }
            placeholder="blur"
            priority={ false }
          />
          
          <div className="h-10 w-full"></div>

          {
            designCategories.map(cat => (
              <span key={cat.id} className="mr-2 mb-2 inline-block bg-gray-300 rounded-full py-1 px-3 text-sm font-semibold text-gray-700">
                {cat.attributes.title}
              </span>
            ))
          }          

          <div className="my-4">
            <span className="mr-4 text-gray-600">Likes: {design.likes}</span>
            <span className="text-gray-600">Views: {design.views}</span>
          </div>

          <p className="text-gray-600">Updated at: {design.updatedAt}</p>
          <p>
            <a href={design.link} className="text-blue-500 hover:underline">{design.link}</a>
          </p>

          <p className="mt-4">
            {
              fonts.map((font, index) => (
                <span key={index} className="mr-2 bg-gray-300 rounded-full py-1 px-3 text-sm font-semibold text-gray-700">
                  {font}
                </span>
              ))
            }
          </p>
        </div>
      </div>
      ) : null
    )
  )
}