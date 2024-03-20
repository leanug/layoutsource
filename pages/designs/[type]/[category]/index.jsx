import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { isValidType } from '@/utils'
import { DesignsGridWrapper, LoadingIndicator, UserLayout } from '@/components'
import { PageMenu } from '@/containers'
import { useDesigns, useAuth } from '@/hooks'

/**
 * PageTypePage component displays a page with categories and designs
 * based on the provided data.
 *
 * @param {Object} props - Component props.
 * @param {Array} [props.data.categories] - An array of category data to display.
 * @returns {JSX.Element} React component.
 */
const DesignsByCategoryPage = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { type, category } = router.query
  const validType = isValidType(type) // Check if the type is valid

  // Fetch data
  useDesigns()

  useEffect(() => {
    // Redirect to 404 page if the type is invalid or user is not logged in
    if (!validType || (!loading && !user)) {
      console.log('User not logged in or invalid type')
      //router.push('/404') // Uncomment this line to redirect to 404 page
    }
  }, [validType, loading, user])

  if (!validType) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
      <PageMenu type={type} categorySlug={category} displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByCategoryPage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignsByCategoryPage
