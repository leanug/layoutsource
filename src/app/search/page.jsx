'use client'

import { useSearchParams } from 'next/navigation'

import { sanitizeQueryString } from '@/utils'
import {
  DisplayDesigns,
  DesignCard,
  DesignImage,
  DesignInfo,
  LoadingIndicator,
  LoadMore,
  NoResults,
} from '@/components'
import { useSearchDesigns } from '@/hooks'
import {
  PageMenu,
  DropdownMenu,
  PageMenuSearchHeader,
  PageMenuResultsInfo,
} from '@/containers'

const LikeDesignButton = () => {
  return <button className="btn btn-primary">Like</button>
}

/**
 * SearchPage component for displaying search results.
 * @component
 * @returns {JSX.Element} SearchPage component JSX
 */
function SearchPage() {
  // Access the query parameters from the URL
  const searchParams = useSearchParams()
  const search = searchParams.get('s')
  const safeQuery = sanitizeQueryString(search)

  const { designs, pagination, page, pageHandler, loading, setSortBy } =
    useSearchDesigns(safeQuery)

  return (
    <>
      <PageMenu
        info={<PageMenuSearchHeader searchQuery={safeQuery} />}
        resultsInfo={<PageMenuResultsInfo totalItems={pagination.totalItems} />}
        action={<DropdownMenu setPage={pageHandler} setSortBy={setSortBy} />}
      />

      <DisplayDesigns
        designsList={designs?.map((item) => (
          <DesignCard
            key={item._id}
            design={item}
            designImage={
              <DesignImage coverSrc={item?.cover} title={item.title} />
            }
            designInfo={
              <DesignInfo
                slug={item.slug}
                title={item.title}
                likes={item.likes}
                views={item.views}
              />
            }
            actionLike={<LikeDesignButton />}
          />
        ))}
        LoadingIndicator={loading ? <LoadingIndicator centered={true} /> : null}
      />

      <LoadMore
        loading={loading}
        pagination={pagination}
        pageHandler={pageHandler}
        page={page}
        message="You've seen all the designs."
      />

      <NoResults pagination={pagination} text={'No results found'} />
    </>
  )
}

export default SearchPage
