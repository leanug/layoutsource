import { DesignsGridWrapper, UserLayout } from '@/components'
import { PageMenu } from '@/containers'

/**
 * PageTypePage component displays a page with categories and designs
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByCategoryPage = () => {
  console.count('TypePage')

  /* const validType = isValidType(type)
  const validCategory = isValidCategory(categories, category)

  useEffect(() => {
    if (!validType || !validCategory) {
      router.push('/404')
    }
  }, [validType, validCategory, router])

  if (!validType || !validCategory || !designs) {
    return <ScreenLoadingIndicator />
  } */

  return (
    <>
      <PageMenu categorySlug={'all'} displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByCategoryPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignsByCategoryPage
