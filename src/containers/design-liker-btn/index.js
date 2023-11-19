import { LoadingIndicator } from "@/components"
import { HeartRegular, HeartSolid } from "@/components/icons"

import { useLikeDesign } from "@/hooks"

import { LikedLayouts, Layout } from "@/api"

const likedLayoutCtrl = new LikedLayouts()
const layoutCtrl = new Layout()

/**
 * Displays and handles a design like / dislike button
 *
 * @returns {JSX.Element} React component.
 */
export function DesignLikerBtn(props) {
  const { layoutId, likes, likeHandler, dislikeHandler } = props

  const useLikeDesignProps = {
    layoutId, 
    likes, 
    likeHandler, 
    dislikeHandler, 
    likedLayoutCtrl, 
    layoutCtrl 
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