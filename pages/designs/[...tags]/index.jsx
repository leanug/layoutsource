import { DesignsGridWrapper, UserLayout } from '@/components'
import { PageMenu } from '@/containers'
import { useAuthProtection } from '@/hooks'

/**
 * PageTypePage component displays a page with categories and designs
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByTypePage = () => {
  useAuthProtection()

  return (
    <>
      <PageMenu displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByTypePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignsByTypePage
