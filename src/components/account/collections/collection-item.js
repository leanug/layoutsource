import Link from "next/link"
import Image from "next/image";

export function CollectionItem ({ item }) {
  const dataURL = item?.attributes.designs.data[0]
  console.log('dataURL', dataURL);
  const imgData = dataURL?.attributes.image.data.attributes.url
  //console.log(item);
  return (
    <Link href={`collection/${ item.attributes.title }`}>
        <div>{ item.attributes.title }</div>
        {
          imgData ? (
            <Image
              src={ dataURL }
              alt={ item.attributes.title }
              className="w-full h-full object-cover rounded-md mx-auto origin-top"
              width="0"
              height="0"
              sizes="100vw"
              
              priority={false}
            />
          ) : null
        }
    </Link>
  )
}