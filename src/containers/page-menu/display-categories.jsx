import Link from 'next/link'

import { useCategoriesByType } from '@/hooks'

export const DisplayCategories = (props) => {
  const { categorySlug, type, className } = props
  const { categories } = useCategoriesByType(type)

  return (
    <aside className={`overflow-x-auto ${className}`}>
      <div className="overflow-x-auto" style={{ paddingBottom: '4px' }}>
        <ul className="flex flex-row items-center gap-4">
          {/* All category */}
          <li key="all">
            {categorySlug === 'all' ? (
              <div className="px-3 py-1.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg justify-center items-center inline-flex">
                <div className="font-semibold">All</div>
              </div>
            ) : (
              <Link
                href={`/designs/${type}`}
                className="px-3 py-1.5 transition-colors ease-in bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 rounded-lg justify-center items-center inline-flex"
              >
                All
              </Link>
            )}
          </li>

          {/* Other categories */}
          {categories?.map((category) => (
            <li key={category.id}>
              {categorySlug === category.attributes.slug ? (
                <div className="px-3 py-1.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg justify-center items-center inline-flex">
                  <div className="font-semibold">
                    {category.attributes.title}
                  </div>
                </div>
              ) : (
                <Link
                  href={`/designs/${type}/${category.attributes.slug}`}
                  className="px-3 py-1.5 transition-colors ease-in bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 rounded-lg justify-center items-center inline-flex"
                >
                  {category.attributes.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
