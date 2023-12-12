import { useState } from "react"
import Image from "next/image"
import { DesignLikerBtn } from "@/containers"
import { BookmarkRegular } from '@/components'
import { ItemCardFooter } from "./item-card-footer"
import fallbackImg from '@/assets/images/default.png'

/**
 * Displays a design card with its buttons for logged users
 *
 * @returns {JSX.Element} React component.
 */
export default function GridItem(props) {
  const { design, openCollectionsModal, user, showcaseDesign } = props
  const [likes, setLikes] = useState(design.likes)
 
  const likeHandler = () => {
    setLikes(prevLikes => prevLikes + 1)
  }
  
  const dislikeHandler = () => {
    setLikes(prevLikes => likes ? prevLikes - 1 : 0)
  }
  
  return (
    <div key={ design.id }>
      <div className="transition h-full flex flex-col justify-between dark:text-white">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <div 
            className="h-48 md:h-[420px] overflow-hidden w-full bg-slate-500 origin-top cursor-pointer rounded-lg"
            onClick={ () => showcaseDesign(design.slug) }
          >
            {
              design?.cover ? (
                <Image
                  src={ design?.cover && design.cover?.url ? design.cover.url : fallbackImg }
                  alt={ design.title }
                  className="w-full h-full object-cover mx-auto origin-top"
                  width="0"
                  height="0"
                  sizes="100%"
                  priority={ true }
                />
              ) : null
            }
          </div>
          {
            user ? (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={ () => openCollectionsModal(design.id) }
                  >
                    <BookmarkRegular />
                  </button>
                  <DesignLikerBtn 
                    designId={ design.id }
                    likeHandler={ likeHandler }
                    dislikeHandler={ dislikeHandler }
                    likes={ likes }
                    userId={ user.id }
                  />
                </div>
              </div>
            ) : null
          }
        </div>
        <div className="row-span-1">
          <ItemCardFooter
            slug={ design.slug }
            title={ design.title }
            likes={ likes } // likes state
            views={ design.views }
            showcaseDesign={ showcaseDesign }
          />
        </div>
      </div>
    </div>
  )
}