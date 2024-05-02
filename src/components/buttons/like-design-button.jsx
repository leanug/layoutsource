'use client'

import { useDesignLikes } from '@/hooks'
import { LoadingIndicator, HeartSolid, HeartRegular } from '..'

export function LikeDesignButton({ designId, designLikes, userId }) {
  const { loading, isLikedDesign, handleLikeDesign, handleDislikeDesign } =
    useDesignLikes(designId, designLikes, userId)

  loading ? (
    <button className="btn z-30" disabled={loading}>
      <LoadingIndicator />
    </button>
  ) : null

  return (
    <button
      onClick={isLikedDesign ? handleDislikeDesign : handleLikeDesign}
      className="btn z-30"
      disabled={loading}
    >
      {isLikedDesign ? (
        <HeartSolid className="w-5 h-5" />
      ) : (
        <HeartRegular className="w-5 h-5" />
      )}
    </button>
  )
}
