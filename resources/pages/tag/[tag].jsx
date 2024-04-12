import { DesignsGridWrapper, AuthLayout } from '@/components'
import { PageMenu } from '@/containers'
import { useDesigns } from '@/hooks'
import { useRouter } from 'next/router'

/**
 * PageTypePage component displays a page with categories and designs
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByTagPage = () => {
  const router = useRouter()
  const {tag} = router.query
  
  useDesigns()

  return (
    <>
      <PageMenu tag={tag} displayCategories={false} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByTagPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default DesignsByTagPage
