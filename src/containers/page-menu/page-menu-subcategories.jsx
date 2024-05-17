import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useSubCategories } from '@/hooks'
import { sanitizeSlug } from '@/utils'

export const PageMenuSubCategories = ({ className }) => {
  const pathname = usePathname()

  const parts = pathname.split('/')
  const categorySlug = parts[2]
  const subcategorySlug = parts[3] || null // Set to null if subcategory is not present

  const safeCategorySlug = sanitizeSlug(categorySlug)
  const safeSubCategorySlug = sanitizeSlug(subcategorySlug)

  const { subCategories } = useSubCategories(safeCategorySlug)

  return (
    <aside className={`overflow-x-auto w-full ${className}`}>
      <div className="overflow-x-auto" style={{ paddingBottom: '4px' }}>
        <ul className="flex flex-row items-center gap-4">
          {/* All category */}
          <li key="all">
            {!safeSubCategorySlug ? (
              <div className="btn btn-sm btn-neutral">
                <div className="font-semibold">All</div>
              </div>
            ) : (
              <Link
                href={`/designs/${safeCategorySlug}`}
                className="btn btn-sm"
              >
                All
              </Link>
            )}
          </li>

          {/* Other categories */}
          {subCategories?.map((item) => (
            <li key={item._id}>
              {safeSubCategorySlug === item.slug ? (
                <div className="btn btn-sm btn-neutral">
                  <div className="font-semibold">{item.title}</div>
                </div>
              ) : (
                <Link
                  href={`/designs/${safeCategorySlug}/${item.slug}`}
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
