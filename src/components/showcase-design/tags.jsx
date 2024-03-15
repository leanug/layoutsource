import React from 'react'

const Tags = ({ tags }) => {
  if (!tags) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="mb-3">Tags</h3>
      <div className="space-x-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Tags
