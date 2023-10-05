import Collections from '@/containers'
import { Collection } from '@/api'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks'
import Image from 'next/image'

const collectionCtrl = new Collection()

export default function CollectionsPage() {
  const [collections, setCollections] = useState([])
  const { user } = useAuth()
  
  useEffect(() => {
    (async () => {
      if (user) {
const response = await collectionCtrl.getAll(user.id)
setCollections(response)
      console.log('res=', response);
      }
      
    })()
  }, [user])
  return (
    <>
      <div>Collections</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white shadow-md p-4 rounded-lg flex flex-row items-center gap-4">
            {collection.attributes.designs.data.length > 0 && (
              <div style={{maxHeight: '50px', overflow: 'hidden'}}>
              <Image
                src={collection.attributes.designs.data[0].attributes.image.data.attributes.url}
                alt={collection.attributes.title}
                width={80}
                height={80}
              />
              </div>
            )}
            <h2 className="text-lg font-semibold mb-2">{collection.attributes.title}</h2>
            {/* Add more details or buttons as needed */}
          </div>
        ))}
      </div>
    </>
  )
}