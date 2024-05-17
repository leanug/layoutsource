'use client'

import { UseCollectionDesignsData } from '@/hooks'
import { useUserStore, useModalStore } from '@/store'

import {
  DropdownMenu,
  Collections,
  PageMenu,
  PageMenuResultsInfo,
  PageMenuCollectionHeader,
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

function CollectionsPage() {
  const { user } = useUserStore()
  const { handleModal } = useModalStore()

  const { designs, collection, pagination, page, incrementPage, loading } =
    UseCollectionDesignsData(user._id)

  return (
    <>
      <PageMenu
        info={
          <PageMenuCollectionHeader
            collectionDescription={collection?.description}
            collectionTitle={collection?.title}
          />
        }
        resultsInfo={<PageMenuResultsInfo totalItems={pagination.totalItems} />}
        action={
          <div className="flex justify-end gap-2.5">
            <button
              onClick={() =>
                handleModal(
                  true, // Open modal
                  <div>Modify collection Form</div>, // Modal content
                  'Modify Collection', // Modal title
                )
              }
              className="btn"
            >
              Modify Collection
            </button>
            <button className="btn">Remove Collection</button>
          </div>
        }
      />

      <div className="w-full h-3 lg:h-6"></div>

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
                    true, // Open modal
                    <Collections userId={user.id} designId={item._id} />, // Modal content
                    'Collections', // Modal title
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
        pageHandler={incrementPage}
        page={page}
        message="You've seen all the designs."
      />
    </>
  )
}

export default CollectionsPage
