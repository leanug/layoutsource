import Link from 'next/link';

export const DisplayCategories = ({ categorySlug, type, categories, className }) => {
  return (
    <aside className={`w-full px-3 mb-3 md:px-16 ${className}`}>
      <div className="overflow-x-auto" style={{ paddingBottom: '14px' }}>
        <ul className="flex flex-row items-center gap-4">
          {/* All category */}
          <li key="all">
            {categorySlug === 'all' ? (
              <div className="px-3 py-1.5 bg-gray-100 rounded-lg justify-center items-center inline-flex">
                <div className="text-gray-900 font-medium">All</div>
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
                <div className="px-3 py-1.5 bg-gray-100 rounded-lg justify-center items-center inline-flex">
                  <div className="text-gray-900 font-medium">{category.attributes.title}</div>
                </div>
              ) : (
                <Link
                  href={`/designs/${type}/${category.attributes.slug}`}
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  {category.attributes.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
