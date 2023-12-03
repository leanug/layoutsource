import { LoadingIndicator } from "@/components"
import { HeartRegular, HeartSolid } from "@/components/icons"

import { useLikeDesign } from "@/hooks"

import { LikedDesigns, Layout } from "@/api"

const likedDesignCtrl = new LikedDesigns()
const layoutCtrl = new Layout()

/**
 * Displays and handles a design like / dislike button
 *
 * @returns {JSX.Element} React component.
 */
export function DesignLikerBtn(props) {
  const { designId, likes, likeHandler, dislikeHandler, userId } = props

  const useLikeDesignProps = {
    designId, 
    likes, 
    likeHandler, 
    dislikeHandler, 
    likedDesignCtrl, 
    layoutCtrl,
    userId
  }

  const { 
    loading, 
    handleDislikeLayout, 
    handleLikeLayout, 
    likedLayout
  } = useLikeDesign(useLikeDesignProps)

  if (likedLayout === null) return <LoadingIndicator  />

  // Show like / dislike buttons
  return (
    <div>
      {loading ? (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2">
          <LoadingIndicator />
        </div>
      ) : (
        <div>
          {likedLayout ? (
            <button
              onClick={ handleDislikeLayout }
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2"
            >
              <HeartSolid className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={ handleLikeLayout }
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2"
            >
              <HeartRegular className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}