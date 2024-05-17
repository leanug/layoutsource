'use client'

import { useDesignLikesManager } from '@/hooks'
import { LoadingIndicator } from '..'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'

export function LikeDesignButton({ designId, designLikes }) {
  const { loading, handleLikeDesign, isLikedDesign, handleDislikeDesign } =
    useDesignLikesManager(designId, designLikes)

  return (
    <button
      onClick={(event) => {
        if (!loading) {
          isLikedDesign ? handleDislikeDesign() : handleLikeDesign()
        }
        event.stopPropagation() // Don't open design
      }}
      className="btn z-30"
    >
      {loading ? <LoadingIndicator /> : null}
      {isLikedDesign
        ? !loading && <HeartIcon className="h-6 w-6 " />
        : !loading && <HeartOutlineIcon className="h-6 w-6 " />}
    </button>
  )
}
