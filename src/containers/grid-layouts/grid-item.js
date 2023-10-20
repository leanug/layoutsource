import { useState } from "react"
import Image from "next/image"
import { DesignLikerBtn } from "@/containers"
import { BookmarkRegular } from '@/components'
import Link from "next/link"
import { ItemCardFooter } from "./item-card-footer"
import {useRouter} from "next/router"

export default function GridItem(props) {
  console.log(props);
  const { layout, openCollectionsModal, user } = props
  const [likes, setLikes] = useState(layout.attributes.likes)
  const imgData = layout?.attributes?.cover?.data
  const dataURL = imgData?.attributes.formats?.small.url || imgData?.attributes.url;
  const altImg = imgData?.attributes.name || ''
  const designSlug = layout.attributes.slug
  const router = useRouter()

  const handleRouter = (designSlug) => {
    // Navigate to the card details page
    router.push(`/showcase/${designSlug}`, undefined, { shallow: true });
  };

  return (
    <div key={ layout.id }>
      <div className="transition h-full flex flex-col justify-between">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <div 
            className="h-full max-h-[420px] overflow-hidden w-full bg-slate-200 origin-top"
            onClick={ () => handleRouter(designSlug) }
          >
            {
              imgData ? (
                <Image
                  src={ dataURL }
                  alt={ altImg }
                  className="w-full h-full object-cover rounded-md mx-auto origin-top"
                  width="0"
                  height="0"
                  sizes="100vw"
                  /* blurDataURL={ dataURL } */
                  /* placeholder="blur" */
                  priority={false}
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
                    setLikes={ setLikes }
                    likes={ likes }
                  />
                </div>
              </div>
            ) : null
          }
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