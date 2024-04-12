import React from 'react'
import Link from 'next/link'

const Tags = ({ tags }) => {
  if (!tags) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="mb-3">Tags</h3>
      <div className="space-x-2">
        {tags.length &&
          tags.map((tag, index) => (
            <Link
              href={`/tag/${tag.slug}`}
              key={index}
              className="inline-block bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 rounded-lg"
            >
              {tag.title}
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Tags
