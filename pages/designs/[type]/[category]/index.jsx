import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { isValidType } from '@/utils'
import { DesignsGridWrapper, LoadingIndicator, UserLayout } from '@/components'
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
const DesignsByCategoryPage = () => {
  useDesigns() // Fetch data
  const router = useRouter()
  console.count('CategoryPage')

  const { type, category } = router.query
 
  const validType = isValidType(type)

  useEffect(() => {
    if (!validType) {
      //router.push('/404')
      console.log('Category or Type not valid: Redirect')
    }
  }, [validType, router])

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
