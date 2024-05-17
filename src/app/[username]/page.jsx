'use client'

import { useLikedDesignsData } from '@/hooks'
import { Collections } from '@/containers'
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
  ProfileHeader,
  ProfileNav,
} from '@/components'
import { useUserStore, useModalStore } from '@/store'

function Profile() {
  const { designs, pagination, pageHandler, isDataFetched, page, loading } =
    useLikedDesignsData()

  const { user } = useUserStore()
  const { handleModal } = useModalStore()

  return (
    <>
      <ProfileHeader user={user} />

      <div className="w-full h-8"></div>

      <ProfileNav username={user.username} />

      <div className="w-full h-14"></div>

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
                    <Collections userId={user?._id} designId={item._id} />,
                    'Collections',
                  )
                }
              />
            }
            actionLike={
              <LikeDesignButton
                userId={user?._id}
                designLikes={item.likes}
                designId={item._id}
              />
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
        text={'No liked designs yet.'}
        showIcon={false}
      />
    </>
  )
}

export default Profile
