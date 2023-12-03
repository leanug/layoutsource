import { useDesign } from "@/hooks/use-design"
import { LoadingIndicator } from "../loading-indicator"
import Image from "next/image"

export function ShowcaseDesign () {
  // useDesign gets the design data by fetching it using the url
  const { design, loading } = useDesign()
  
  let designCategories = [];
  let designColors = [];
  let imgUrl, imgHeight, imgWidth, fonts;
  console.log(design);
  if (design?.slug) {
    const img = design.image.data.attributes
    console.log(design);
    designCategories = design.categories.data || [];
    designColors = design.colors || []
    fonts = design?.fonts || []
    imgUrl = img.url;
    imgHeight = img.height;
    imgWidth = img.width;
  }

  /* console.log('design=', design); */

  return (
    loading ? (
      <LoadingIndicator />
    ) : (
      design?.slug ? (
      <div className="">
        <h1>{ design.title }</h1>
        {
          designCategories.map(cat => (
            <span key={ cat.id }>{ cat.attributes.title }</span>
          ))
        }
        {
          designColors.map((color, index) => (
            <span key={index}>{color}</span>
          ))
        }
        <p>Updated at: { design.updatedAt }</p>
        <p><a href={ design.link }>Visit { design.link }</a></p>
        <p>
          {
            fonts.map((font, index) => (
              <span key={ index }>{ font }</span>
            ))
          }
        </p>
        <p>Views: { design.views }</p>

        <Image
          src={ imgUrl } // Path to your image in the public folder
          alt={ design.title }
          width={ imgWidth } // The width of the image in pixels
          height={ imgHeight } // The height of the image in pixels
          className="h-auto mx-auto"
          blurDataURL={ imgUrl }
          placeholder="blur"
          priority={ false }
          />
      </div>
      ) : null
    )
  )
}