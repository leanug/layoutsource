import Link from 'next/link'

const Categories = ({ categories, type }) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="mb-3">Categories</h3>
      <div className="space-x-2">
        {categories.map((cat) => (
          <Link
            href={`/designs/${type.attributes.slug}/${cat.attributes.slug}`}
            key={cat.id}
            className="inline-block bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 rounded-lg"
          >
            {cat.attributes.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
