import { headers } from 'next/headers'
import Image from 'next/image'

import { connectDB } from '@/lib/mongodb'
import Design from '@/models/design'
import { ENV, sanitizeSlug } from '@/utils'
import { Header, LikeDesignButton } from '@/components'
import fallbackImg from '@/assets/images/default.png'
import Dropdown from '@/components/showcase-design/dropdown'
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'

async function getData(designSlug) {
  try {
    await connectDB() // Connect to MongoDB

    const safeDesignSlug = sanitizeSlug(designSlug)

    const design = await Design.find({ slug: safeDesignSlug })
    const relatedDesigns = []

    return { design, relatedDesigns }
  } catch (error) {
    console.error(error)
  }
}

const Showcase = async ({ params }) => {
  const { designslug } = params
  const data = await getData(designslug)
  const { design, relatedDesigns } = data
  const designData = design[0]
  console.log('data:', data)

  /*
 If the below component is the default export of a `page.js` and you are using 
 dynamic routes, slugs will be passed as part of `params`, and 
 query strings are passed as part of `searchParams`.
*/
  /* 
    This request should be cached until manually invalidated.
    Similar to `getStaticProps`.
    `force-cache` is the default and can be omitted.
  */
  //const staticData = await fetch(`https://...`, { cache: "force-cache" });

  /*
    This request should be refetched on every request.
    Similar to `getServerSideProps`.
  */
  //const dynamicData = await fetch(`https://...`, { cache: "no-store" });

  /* 
    This request should be cached with a lifetime of 10 seconds.
    Similar to `getStaticProps` with the `revalidate` option.
  */
  /* const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  }); */

  return designData?.image ? (
    <section className="absolute top-20 bottom-20 left-0 w-full px-2.5 h-full bg-base-100 no-animation">
      <div className="h-24 w-full"></div>
      <div className="flex flex-col md:flex-row gap-3 justify-between w-full max-w-7xl mx-auto rounded-lg py-2.5 px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-bold">{designData.title}</h1>
          <a href={designData.link} className="btn btn-ghost font-semibold">
            {designData.link}
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        </div>
        {true && (
          <ul className="flex flex-row gap-2">
            <li>
              {/* <CollectionsToggleButton
                // Open collections modal
                action={() =>
                  handleModal(
                    true,
                    <Collections userId={user._id} designId={designData._id} />,
                    'Collections',
                  )
                }
              /> */}
            </li>
            <li>
              <LikeDesignButton
                userId={'6618479f3c2188cfe0f324c3'}
                designLikes={designData.likes}
                designId={JSON.parse(JSON.stringify(designData._id))}
              />
            </li>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost mb-2">
                  <EllipsisHorizontalIcon className="w-6 h-6" />
                </div>
                <Dropdown designData={designData} />
              </div>
            </li>
          </ul>
        )}
      </div>
      {/* Design image */}
      <div className="w-full h-full relative">
        <Image
          src={designData?.image || fallbackImg} // Path to your image in the public folder
          alt={designData?.title || 'Image'} // Make sure title is available or provide a fallback alt text
          className="rounded-lg p-0 m-0" // Responsive image styles
          fill // Set layout to fill to ensure the image fills its container
          style={{
            objectFit: 'contain', // Maintain proportions without deforming the image
            objectPosition: 'center', // Center the image
          }}
          priority={false}
          sizes="(max-width: 1200px) 100vw, 1200px" // Adjust sizes for different screen widths
        />
      </div>
      {/* End Design image */}
      <div className="h-10 w-full"></div>
      <div className="divider">Related</div>
      <div className="h-10 w-full"></div>
    </section>
  ) : (
    <section className="section-full">Oops! Design not found.</section>
  )
}

export default Showcase
