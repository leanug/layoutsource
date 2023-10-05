import { useState } from "react"
import { DesignLikerBtn } from "../design-liker-btn"
import { 
  HeartSolid, 
  EyeSolid, 
  BookmarkRegular 
} from '@/components/icons'
import Link from "next/link"

export default function GridItem(props) {
  const { layout, openCollectionsModal } = props
  const [likes, setLikes] = useState(layout.attributes.likes)
  
  return (
    <div key={ layout.id }>
      <div className="transition">
        <div className="w-full mb-4 relative group">
          <Link href={ `/${ layout.attributes.slug }` }>
            <img
              src={ layout.attributes.cover.data.attributes.url }
              alt={ layout.title }
              className="w-full h-full object-cover rounded-md"
            />
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
        <div className="flex flex-row items-center justify-between gap-3">
          <Link href={`/${ layout.attributes.slug }` }>
            <h2 className="text-gray-900">
              { layout.attributes.title }
            </h2>
          </Link>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row gap-1.5 items-center">
              <EyeSolid className="w-4 h-4 fill-slate-400" />
              <span className="text-gray-600">{ layout.attributes.views }</span>
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <HeartSolid className="w-4 h-4 fill-slate-400" />
              <span className="text-gray-600">{ likes }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}