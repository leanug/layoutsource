'use client'

import { BookmarkSolid } from '..'

export function CollectionsToggleButton({ action }) {
  return (
    <button onClick={action} className="btn z-30">
      <BookmarkSolid className="w-5 h-5 fill-current" />
    </button>
  )
}
