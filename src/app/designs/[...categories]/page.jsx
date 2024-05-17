'use client'

import { useDesigns } from '@/hooks'
import {
  DropdownMenu,
  Collections,
  PageMenu,
  PageMenuResultsInfo,
  PageMenuSubCategories,
} from '@/containers'
import {
  DisplayDesigns,
  LoadMore,
  NoResults,
  DesignCard,
  DesignInfo,
  LoadingIndicator,
  DesignImage,
  LikeDesignButton,
  CollectionsToggleButton,
} from '@/components'
import { useModalStore, useUserStore } from '@/store'

const DesignsPage = () => {
  const { user } = useUserStore()
  const { handleModal } = useModalStore()

  const {
    designs,
    pagination,
    isDataFetched,
    page,
    pageHandler,
    loading,
    setSortBy,
    setPage,
  } = useDesigns()

  return (
    <>
      <PageMenu
        info={<PageMenuSubCategories />}
        resultsInfo={<PageMenuResultsInfo totalItems={pagination.totalItems} />}
        action={<DropdownMenu setPage={setPage} setSortBy={setSortBy} />}
      />

      <DisplayDesigns
        designsList={designs?.map((item) => (
          <DesignCard
            key={item._id}
            design={item}
            designImage={
              <DesignImage /* coverSrc={item?.cover} */ title={item.title} />
            }
            designInfo={
              <DesignInfo
                slug={item.slug}
                title={item.title}
                likes={item.likes}
                views={item.views}
              />
            }
            actionCollections={
              <CollectionsToggleButton
                // Open collections modal
                action={() =>
                  handleModal(
                    true,
                    <Collections userId={user.id} designId={item._id} />,
                    'Collections',
                  )
                }
              />
            }
            actionLike={
              <LikeDesignButton designLikes={item.likes} designId={item._id} />
            }
          />
        ))}
        LoadingIndicator={
          loading ? (
            <div className="pt-3">
              <LoadingIndicator centered={true} />
            </div>
          ) : null
        }
      />

      <LoadMore
        loading={loading}
        pagination={pagination}
        pageHandler={pageHandler}
        page={page}
        message="You've seen all the designs."
      />

      <NoResults
        isDataFetched={isDataFetched}
        pagination={pagination}
        text={'No results found'}
      />
    </>
  )
}

export default DesignsPage
