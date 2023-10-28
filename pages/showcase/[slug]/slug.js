import Categories from './categories' // Adjust the path
import { DesignLikerBtn } from '@/containers/design-liker-btn'
import Image from 'next/image'
import { NoResults } from '@/components'

/**
 * LayoutPage component displays information about a design layout.
 *
 * @param {object} props - The component props.
 * @param {object|null} props.data - The data representing the design layout or null if no data is available.
 * @returns {JSX.Element} - Returns the JSX element to render the layout page.
 */
export default function LayoutPage ({ data }) {
  
  if(! data) {
    return (
      <NoResults text="No designs found." />
    )
  }

  const layoutData = data.data[0] || {}
  const layoutId = layoutData?.id || {}
  const categories = layoutData.attributes.categories?.data || []
  const largeImageUrl = layoutData.attributes.image.data.attributes.formats.large.url || ''
  const imageName = layoutData.attributes.image.data.attributes.formats.large.name || ''
  const largeImageWidth = layoutData.attributes.image.data.attributes.formats.large.width || ''
  const largeImageHeight = layoutData.attributes.image.data.attributes.formats.large.height || ''

  return (
    <div className="text-center p-4">
    <h1 className="text-xl font-bold">Layout</h1>
    <p className="mt-2">Likes: { layoutData.likes || 0}</p>
    <button onClick={ () => router.back() }>Back</button>
    <p>Fonts: { layoutData.fonts || 'N/A'}</p>
    {/* <div className="mt-4">Categories: <CategoryList categories={ categories } /></div> */}
    <DesignLikerBtn layoutId={ layoutId } />
    <div className="mt-4">
      {
        largeImageUrl ? (
          <Image
            src={ largeImageUrl } // Path to your image in the public folder
            alt={ imageName }
            width={ largeImageWidth } // The width of the image in pixels
            height={ largeImageHeight } // The height of the image in pixels
            className="h-auto mx-auto"
            blurDataURL={ largeImageUrl }
            placeholder="blur"
            priority={false}
          />
        ) : (
          null
        )
      }
      </div>
    </div>
  )
}