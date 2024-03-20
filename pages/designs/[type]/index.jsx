import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { isValidType } from '@/utils'
import { DesignsGridWrapper, UserLayout, LoadingIndicator } from '@/components'
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
const DesignsByTypePage = () => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { type } = router.query
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

  // Display loading indicator while loading or if user is not logged in
  if (!validType || loading || !user) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
      <PageMenu type={type} categorySlug={'all'} displayCategories={true} />
      <DesignsGridWrapper />
    </>
  )
}

DesignsByTypePage.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}

export default DesignsByTypePage
