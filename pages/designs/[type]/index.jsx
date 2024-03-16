import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { isValidType } from '@/utils'
import {
  DesignsGridWrapper,
  UserLayout,
  ScreenLoadingIndicator,
} from '@/components'
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
  useDesigns() // Fetch data
  const router = useRouter()
  console.count('TypePage')

  const { type } = router.query

  const validType = isValidType(type) // Check if the type is valid

  useEffect(() => {
    // Category not found
    if (!validType) {
      //router.push('/404')
    }
  }, [validType, router])

  if (!validType) {
    return <ScreenLoadingIndicator />
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
