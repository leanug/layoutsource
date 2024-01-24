import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

import fallbackImg from '@/assets/images/default.png'

export function CollectionItem ({ item }) {
  const dataURL = item?.attributes.designs.data

  let imgData0
  let imgData1
  let imgData2

  if (Array.isArray(dataURL)) {
    // It's an array
    imgData0 = dataURL[0]?.attributes.cover.data?.attributes.url || fallbackImg
    imgData1 = dataURL[1]?.attributes.cover.data?.attributes.url || fallbackImg
    imgData2 = dataURL[2]?.attributes.cover.data?.attributes.url || fallbackImg
  } else {
    // It's not an array
    imgData0 = dataURL?.attributes.cover.data?.attributes.url || fallbackImg
    imgData1 = ''
    imgData2 = ''
  }

  const router = useRouter()
  
  return (
    <Link href={`${ router.asPath }/${ item.attributes.slug }`}>
      <div className="h-32 overflow-hidden mb-1 bg-slate-500 rounded-md ">
        {
          imgData0 ? (
            <Image
              src={ imgData0 }
              alt={ item.attributes.title }
              className="w-full object-cover mx-auto origin-top"
              width="0"
              height="0"
              sizes="100%"
              priority={ false }
            /> 
          ) : null
        }
      </div>
      <div className="flex flex-row gap-1">
        <div className=" bg-slate-500 h-20 w-full rounded-md overflow-hidden">
          {
            imgData1 ? (
              <Image
                src={ imgData1 }
                alt={ item.attributes.title }
                className="w-full object-cover mx-auto origin-top"
                width="0"
                height="0"
                sizes="100%"
                priority={false}
              /> 
            ) : null
          }
        </div>
        <div className=" bg-slate-500 w-full h-20 rounded-md overflow-hidden">
          {
            imgData2 ? (
              <Image
                src={ imgData2 }
                alt={ item.attributes.title }
                className="w-full object-cover mx-auto origin-top"
                width="0"
                height="0"
                sizes="100%"
                priority={false}
              /> 
            ) : null
          }
        </div>
      </div>
      <div className="mt-3 text-lg">{ item.attributes.title }</div>
      <div className="mt-1">Items: { item.attributes.totalDesigns }</div>
    </Link>
  )
}