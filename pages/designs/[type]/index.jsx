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
const DesignsByTypePage = () => {
  console.count('TypePage')

  return (
    <>
      <PageMenu categorySlug={'all'} displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByTypePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignsByTypePage
