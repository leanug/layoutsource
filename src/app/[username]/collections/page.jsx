'use client'

import Link from 'next/link'

import { ProfileHeader, ProfileNav, LoadMore } from '@/components'
import { useUserStore } from '@/store'
import { useCollections } from '@/hooks'

function CollectionsPage() {
  const { user } = useUserStore()
  
  const { collections, loading, pagination, pageHandler, page } =
    useCollections()
  console.log('collections', collections)
  return (
    <>
      <ProfileHeader user={user} />

      <div className="w-full h-8"></div>

      <ProfileNav />

      <div className="w-full h-14"></div>

      <section className="section-full">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center">
          {collections &&
            collections.map((item) => (
              <li key={item._id}>
                <Link href={`/${user.username}/collections/${item.slug}`}>
                  <div className="card h-full w-full bg-base-100 shadow-xl">
                    <div className="card-body flex flex-col justify-between">
                      <h2 className="card-title">{item.title}</h2>
                      {item.description ? <p>{item.description}</p> : null}
                    </div>
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <LoadMore
        loading={loading}
        pagination={pagination}
        pageHandler={pageHandler}
        page={page}
        message="You've seen all the collections."
      />
    </>
  )
}

export default CollectionsPage
