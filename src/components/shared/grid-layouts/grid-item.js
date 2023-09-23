import { useState } from "react"
import { DesignLikerBtn } from "../design-liker-btn"
import { HeartSolid, EyeSolid } from "../icons"
import Link from "next/link"

export default function GridItem({ layout }) {
  const [likes, setLikes] = useState(layout.attributes.likes)
  
  return (
    <div className="relative" key={ layout.id }>
      <div className="transition">
        <div className="w-full mb-4 relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3">
              <DesignLikerBtn 
                layoutId={ layout.id }
                setLikes={ setLikes }
                likes={ likes }
              />
            </div>
          </div>
          <Link href={`/${ layout.attributes.slug }`}>
            <img
              src={ layout.attributes.cover.data.attributes.url }
              alt={ layout.title }
              className="w-full h-full object-cover rounded-md"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between gap-3">
          <Link href={`/${ layout.attributes.slug }`}>
            <h2 className="text-gray-900">
              { layout.attributes.title }
            </h2>
          </Link>
          <div className="flex flex-row items-center gap-3">
            <div className="flex gap-1.5 items-center">
              <EyeSolid className="w-4 h-4 fill-slate-400" />
              <span className="text-gray-600">{ layout.attributes.views }</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <HeartSolid className="w-4 h-4 fill-slate-400" />
              <span className="text-gray-600">{ likes }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}