import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { isValidType } from '@/utils'
import { DisplayCategories, DropdownMenu } from '.'
import { ScreenLoadingIndicator } from '@/components'
import { useDesignsStore } from '@/store'

export function PageMenu(props) {
  const { searchQuery, categorySlug, className, displaySearchQueryData } = props

  const {
    setSortBy,
    setPage,
    pagination: { totalItems },
  } = useDesignsStore()
  const router = useRouter()
  const { type } = router.query

  const validType = isValidType(type) // Check if the type is valid

  useEffect(() => {
    // Category not found
    if (!validType) {
      //router.push('/404')
    }
  }, [validType, router])

  if (!validType) {
    return <ScreenLoadingIndicator />
  }

  return totalItems ? (
    <section className="mt-20 mb-8">
      <div
        className={`
          section-full mb-3 gap-8 flex-row flex items-center 
          justify-between font-semibold
        `}
      >
        <DisplayCategories
          categorySlug={categorySlug}
          type={type}
          className={className}
        />

        {displaySearchQueryData ? (
          <h1 className="text-center">Query: {searchQuery || '-'}</h1>
        ) : null}

        <div className="flex flex-row items-center gap-3">
          <span className="w-40 text-right font-normal">
            {totalItems} {totalItems === 1 ? 'result' : 'results'}
          </span>
          <DropdownMenu setPage={setPage} setSortBy={setSortBy} />
        </div>
      </div>
    </section>
  ) : null
}
