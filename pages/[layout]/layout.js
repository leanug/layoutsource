import Image from 'next/image';
import CategoryList from './category-list'; // Adjust the path
import { LikedLayoutsIcon } from '@/components/shared/design-liker-btn';

export default function LayoutPage (props) {
  const layoutId = props.data.data[0]?.id
  const categories = props.data.data[0]?.attributes.categories.data;

  return (
    <div>
     <h1 className="text-xl">Layout</h1>
     <p>Likes: { props.data.data[0]?.attributes.likes }</p>
     <p>Fonts: { props.data.data[0]?.attributes.fonts }</p>
     <p>Colors: { props.data.data[0]?.attributes.colors }</p>
     <div>Categories: <CategoryList categories={categories} /></div>
     <LikedLayoutsIcon layoutId={ layoutId } />
     <Image
        src={ props.data.data[0]?.attributes.image.data.attributes.formats.large.url } // Path to your image in the public folder
        alt="My Image"
        width={500} // The width of the image in pixels
        height={300} // The height of the image in pixels
      />
    </div>
  )
}