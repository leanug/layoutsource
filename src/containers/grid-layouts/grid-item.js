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
  const { layout, openCollectionsModal, user, showcaseDesign } = props
  const [likes, setLikes] = useState(layout.likes)

  const likeHandler = () => {
    setLikes(prevLikes => prevLikes + 1)
  }

  const dislikeHandler = () => {
    setLikes(prevLikes => likes ? prevLikes - 1 : 0)
  }

  return (
    <div key={ layout.id }>
      <div className="transition h-full flex flex-col justify-between dark:text-white">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <div 
            className="h-full max-h-[420px] overflow-hidden w-full bg-slate-200 origin-top cursor-pointer rounded-lg"
            onClick={ () => showcaseDesign(designSlug) }
          >
            {
              layout?.cover ? (
                <Image
                  src={ layout?.cover && layout.cover?.url ? layout.cover.url : fallbackImg }
                  alt={ layout.title }
                  className="w-full h-full object-cover mx-auto origin-top"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority={ false }
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
                    onClick={ () => openCollectionsModal(layout.id) }
                  >
                    <BookmarkRegular />
                  </button>
                  <DesignLikerBtn 
                    layoutId={ layout.id }
                    likeHandler={ likeHandler }
                    dislikeHandler={ dislikeHandler }
                    likes={ likes }
                  />
                </div>
              </div>
            ) : null
          }
        </div>
        <div className="row-span-1">
          <ItemCardFooter
            slug={ layout.slug }
            title={ layout.title }
            likes={ likes } // likes state
            views={ layout.views }
            showcaseDesign={ showcaseDesign }
          />
        </div>
      </div>
    </div>
  )
}