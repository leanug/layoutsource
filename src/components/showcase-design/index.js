import { useDesign } from "@/hooks/use-design"
import { LoadingIndicator } from "../loading-indicator"
import Image from "next/image"

export function ShowcaseDesign () {
  // useDesign gets the design data by fetching it using the url
  const { design, loading } = useDesign()
  
  let designCategories = [];
  let designColors = [];
  let imgUrl, imgHeight, imgWidth, fonts;
 
  if (design?.slug) {
    const img = design.image.data.attributes
    designCategories = design.categories.data || [];
    designColors = design.colors || []
    fonts = design?.fonts || []
    imgUrl = img.url;
    imgHeight = img.height;
    imgWidth = img.width;
  }

  return (
    loading ? (
      <LoadingIndicator />
    ) : (
      design?.slug ? (
      <div className="">
        <div className="flex flex-row justify-between px-8 mb-3.5">
          <h1>{ design.title }</h1>
          <div>
            <span>Likes: { design.likes }</span>
            <span>Views: { design.views }</span>
          </div>
        </div>

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
      </div>
      ) : null
    )
  )
}