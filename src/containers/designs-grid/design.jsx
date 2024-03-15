import Image from 'next/image'

import { DesignLikeButton } from '@/components'
import Footer from './footer'
import fallbackImg from '@/assets/images/default.png'
import { OpenCollectionsButton } from '@/components/buttons/open-collections-button'

/**
 * Displays a design card with its buttons for logged users
 */
export default function Design(props) {
  const { design, openCollectionsModal, user, showcaseDesign } = props
  console.count(`GridItem ${design.id}`)
  return (
    <div key={design.id}>
      <div className="transition h-full flex flex-col justify-between dark:text-white">
        <div className="w-full mb-4 relative group flex-grow overflow-hidden">
          <div
            className={`
              h-48 md:h-[720px] overflow-hidden w-full bg-slate-500 
              origin-top cursor-pointer rounded-lg
            `}
            onClick={() => showcaseDesign(design.slug)}
          >
            {design?.image ? (
              <Image
                src={
                  design?.image && design.image?.url
                    ? design.image.url
                    : fallbackImg
                }
                alt={design.title}
                className="w-full h-full object-cover mx-auto"
                style={{ objectPosition: 'top' }}
                width="0"
                height="0"
                sizes="100%"
                priority={true}
              />
            ) : null}
          </div>
          {user ? (
            <div
              className={`
                absolute top-2 right-2 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              `}
            >
              <div className="flex gap-3">
                <OpenCollectionsButton
                  userId={user?.id}
                  onClick={openCollectionsModal}
                />

                <DesignLikeButton
                  likes={design.likes}
                  designId={design.id}
                  userId={user?.id}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="row-span-1">
          <Footer
            slug={design.slug}
            title={design.title}
            likes={design.likes}
            views={design.views}
            showcaseDesign={showcaseDesign}
          />
        </div>
      </div>
    </div>
  )
}
