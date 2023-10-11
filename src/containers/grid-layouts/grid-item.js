import { useState } from "react"
import Image from "next/image"
import { DesignLikerBtn } from "@/containers"
import { BookmarkRegular } from '@/components'
import Link from "next/link"
import { ItemCardFooter } from "./item-card-footer"

export default function GridItem(props) {
  const { layout, openCollectionsModal } = props
  const [likes, setLikes] = useState(layout.attributes.likes)
  
  return (
    <div key={ layout.id }>
      <div className="transition h-full flex flex-col justify-between">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <Link href={ `/${ layout.attributes.slug }` }>
            <div className="h-full max-h-[420px] overflow-hidden w-full bg-slate-200 origin-top">
              <Image
                src={ layout.attributes.image.data.attributes.formats.small.url }
                alt={ layout.attributes.image.data.attributes.name }
                className="w-full h-full object-cover rounded-md mx-auto origin-top"
                width="0"
                height="0"
                sizes="100vw"
                blurDataURL={ layout.attributes.image.data.attributes.formats.small.url }
                placeholder="blur"
                priority={false}
              />
            </div>
          </Link>
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
                setLikes={ setLikes }
                likes={ likes }
              />
            </div>
          </div>
        </div>
        <div className="row-span-1">
          <ItemCardFooter
            slug={ layout.attributes.slug }
            title={ layout.attributes.title }
            likes={ likes }
            views={ layout.attributes.views }
          />
        </div>
      </div>
    </div>
  )
}