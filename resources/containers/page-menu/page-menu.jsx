import { DisplayCategories, DropdownMenu } from '.'
import { useDesignsStore } from '@/store'

export function PageMenu(props) {
  const { searchQuery, className, displaySearchQueryData, tag } = props

  const {
    setSortBy,
    setPage,
    pagination: { totalItems },
  } = useDesignsStore()

  return totalItems ? (
    <section className="mt-16 mb-8">
      <div
        className={`
          section-full mb-3 gap-8 flex-col xl:flex-row flex items-center 
          justify-between font-semibold
        `}
      >
        <DisplayCategories className={className} />

        {displaySearchQueryData ? (
          <h1 className="text-center font-normal text-xl">
            Results Matching:{' '}
            <span className="font-semibold">{searchQuery || '-'}</span>
          </h1>
        ) : null}

        {tag ? (
          <h1 className="text-center font-normal text-xl">
            Tags: <span className="font-semibold">{tag || '-'}</span>
          </h1>
        ) : null}

        <div className="flex flex-row items-center w-full lg:w-56 justify-end gap-3">
          <span className="w-40 text-right font-normal">
            {totalItems} {totalItems === 1 ? 'result' : 'results'}
          </span>
          <DropdownMenu setPage={setPage} setSortBy={setSortBy} />
        </div>
      </div>
    </section>
  ) : null
}


import React from "react"

