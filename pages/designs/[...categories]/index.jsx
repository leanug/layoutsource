import { DesignsGridWrapper, AuthLayout } from '@/components'
import { PageMenu } from '@/containers'
import { useDesigns } from '@/hooks'

/**
 * PageTypePage component displays a page with categories and designs
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByTypePage = () => {
  useDesigns()

  return (
    <>
      <PageMenu displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByTypePage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default DesignsByTypePage
