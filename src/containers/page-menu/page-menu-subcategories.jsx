import Link from 'next/link'

export const PageMenuSubCategories = ({
  className,
  subcategories,
  currentCategorySlug,
  currentSubcategorySlug,
}) => {
  return (
    <aside className={`overflow-x-auto w-full ${className}`}>
      <div className="overflow-x-auto" style={{ paddingBottom: '4px' }}>
        <ul className="flex flex-row items-center gap-4">
          {/* All category */}
          <li key="all">
            {!currentSubcategorySlug ? (
              <div className="btn btn-sm">
                <div className="font-semibold">All</div>
              </div>
            ) : (
              <Link
                href={`/designs/${currentCategorySlug}`}
                className="btn btn-sm"
              >
                All
              </Link>
            )}
          </li>

          {/* Other categories */}
          {subcategories?.map((item) => (
            <li key={item._id}>
              {currentSubcategorySlug === item.slug ? (
                <div className="btn btn-sm btn-neutral">
                  <div className="font-semibold">{item.title}</div>
                </div>
              ) : (
                <Link
                  href={`/designs/${currentCategorySlug}/${item.slug}`}
                  className="btn btn-sm"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
