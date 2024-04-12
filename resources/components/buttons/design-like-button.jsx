import { LoadingIndicator } from '@/components'
import { HeartRegular, HeartSolid } from '@/components/icons'
import { useLikeDesign } from '@/hooks'
import { LikedDesigns, Layout } from '@/api'

const likedDesignCtrl = new LikedDesigns()
const layoutCtrl = new Layout()

/**
 * Displays and handles a design like / dislike button
 */
export function DesignLikeButton(props) {
  const { designId, userId, likes } = props

  const likeDesignProps = {
    designId,
    likes,
    likedDesignCtrl,
    layoutCtrl,
    userId,
  }

  const { loading, handleDislikeLayout, handleLikeLayout, likedLayout } =
    useLikeDesign(likeDesignProps)

  if (likedLayout === null) return <LoadingIndicator />

  // Show like / dislike buttons
  return (
    <div
      className="w-12 h-12 rounded-lg bg-white border 
    hover:bg-gray-100 transition-colors ease-in border-gray-200"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingIndicator size="6" />
        </div>
      ) : (
        <>
          {likedLayout ? (
            <button
              onClick={handleDislikeLayout}
              className="w-full h-full flex items-center justify-center"
            >
              <HeartSolid className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleLikeLayout}
              className="w-full h-full flex items-center justify-center"
            >
              <HeartRegular className="w-5 h-5" />
            </button>
          )}
        </>
      )}
    </div>
  )
}
