import Link from 'next/link';

export const DisplayCategories = (props) => {
  const { 
    categorySlug, 
    type, 
    categories, 
    className 
  } = props
  
  return (
    <aside className={`overflow-x-auto ${ className }`}>
      <div className="overflow-x-auto" style={{ paddingBottom: '4px' }}>
        <ul className="flex flex-row items-center gap-4">
          {/* All category */}
          <li key="all">
            {categorySlug === 'all' ? (
              <div className="px-3 py-1.5 bg-slate-100 dark:text-slate-900 rounded-lg justify-center items-center inline-flex">
                <div className="font-semibold">All</div>
              </div>
            ) : (
              <Link href={`/designs/${type}`} className="text-gray-600 hover:text-gray-800 transition">
                All
              </Link>
            )}
          </li>

          {/* Other categories */}
          {categories?.map((category) => (
            <li key={category.id}>
              {categorySlug === category.attributes.slug ? (
                <div className="px-3 py-1.5 bg-slate-100 rounded-lg justify-center items-center inline-flex">
                  <div className="font-medium">{category.attributes.title}</div>
                </div>
              ) : (
                <Link
                  href={`/designs/${type}/${category.attributes.slug}`}
                  className=" hover:text-gray-800 transition"
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
