'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { useCategories, useSubCategories } from '@/hooks'
import { sanitizeSlug } from '@/utils'

export const usePageData = () => {
  const [filterData, setFilterData] = useState('')
  const pathname = usePathname()
  const parts = pathname.split('/')
  const categorySlug = parts[2]
  const subcategorySlug = parts[3] || null // Set to null if subcategory is not present

  const { categories } = useCategories()
  const safeCategorySlug = sanitizeSlug(categorySlug) // Get current category slug

  const isShowcaseMode = pathname.includes('showcase')

  useEffect(() => {
    if (!subcategorySlug && !isShowcaseMode) {
      const category = categories.find(
        (category) => category.slug === safeCategorySlug,
      )
      setFilterData(category?._id || '')
    }
  }, [
    filterData,
    categories,
    safeCategorySlug,
    subcategorySlug,
    setFilterData,
    isShowcaseMode,
  ])

  // Get subcategories
  const { subCategories } = useSubCategories(safeCategorySlug)

  useEffect(() => {
    if (subcategorySlug && !isShowcaseMode) {
      const safeSubcategorySlug = sanitizeSlug(subcategorySlug)
      const subcategory = subCategories.find(
        (subcategory) => subcategory.slug === safeSubcategorySlug,
      )
      if (subcategory) {
        setFilterData(subcategory._id)
      }
    }
  }, [
    filterData,
    subCategories,
    subcategorySlug,
    setFilterData,
    filterData,
    isShowcaseMode,
  ])

  // Determine the data ID based on the URL parts
  return { filterData }
}
