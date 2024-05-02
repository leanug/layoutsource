'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import {
  useCategories,
  useDesigns,
  useSubCategories,
  useFetchLikedDesigns,
} from '@/hooks'
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
import { sanitizeSlug } from '@/utils'
import { useModalStore } from '@/store'

const DesignsPage = () => {
  const { data } = useSession()
  const user = data?.user
  useFetchLikedDesigns(user?._id)

  const pathname = usePathname()
  const parts = pathname.split('/')
  const categorySlug = parts[2]
  const subcategorySlug = parts[3] || null // Set to null if subcategory is not present

  const { categories } = useCategories()
  const safeCategorySlug = sanitizeSlug(categorySlug) // Get current category slug

  // Get current category
  const currentCategory = categories.find(
    (category) => category.slug === safeCategorySlug,
  )
  const categoryId = currentCategory ? currentCategory._id : null // Get current category ID

  // Get subcategories
  const { subCategories } = useSubCategories(safeCategorySlug)

  // Get current subcategory if available
  let subcategoryId = ''
  let currentSubcategorySlug = ''
  if (subcategorySlug) {
    const safeSubcategorySlug = sanitizeSlug(subcategorySlug)
    currentSubcategorySlug = safeSubcategorySlug

    // Get current subcategory
    const currentSubcategory = subCategories.find(
      (subcategory) => subcategory.slug === safeSubcategorySlug,
    )
    if (currentSubcategory) {
      subcategoryId = currentSubcategory._id
      currentSubcategorySlug = currentSubcategory.slug
    }
  }

  // Determine the data ID based on the URL parts
  const fetchDataId = parts.length === 3 ? categoryId : subcategoryId

  const {
    designs,
    pagination,
    isDataFetched,
    page,
    pageHandler,
    loading,
    setSortBy,
    setPage,
  } = useDesigns(fetchDataId, pathname)

  const { handleModal } = useModalStore()

  return (
    <>
      <PageMenu
        info={
          <PageMenuSubCategories
            subcategories={subCategories}
            currentCategorySlug={safeCategorySlug}
            currentSubcategorySlug={currentSubcategorySlug}
          />
        }
        resultsInfo={<PageMenuResultsInfo totalItems={pagination.totalItems} />}
        action={<DropdownMenu setPage={setPage} setSortBy={setSortBy} />}
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
        LoadingIndicator={loading ? <LoadingIndicator centered={true} /> : null}
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
