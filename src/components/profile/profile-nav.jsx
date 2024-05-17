import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { sanitizeSlug } from '@/utils'

export function ProfileNav({ username }) {
  const pathname = usePathname()
  const segments = pathname.split('/') // Split the pathname into segments
  const lastSegment = segments[segments.length - 1] // Get the last segment
  const safeSlug = sanitizeSlug(lastSegment)

  return (
    <div className="w-full flex justify-center">
      <div className="join join-vertical lg:join-horizontal">
        <Link
          href={`/${username}/likes`}
          className={`btn join-item ${safeSlug !== 'collections' ? 'btn-active' : ''}`}
        >
          Likes
        </Link>
        <Link
          href={`/${username}/collections`}
          className={`btn join-item ${safeSlug === 'collections' ? 'btn-active' : ''}`}
        >
          Collections
        </Link>
      </div>
    </div>
  )
}
