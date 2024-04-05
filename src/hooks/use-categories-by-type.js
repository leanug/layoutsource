import { useEffect, useState } from 'react'

import { Category } from '@/api'
import { sanitizeSlug } from '@/utils'

const categoryCtrl = new Category()

export function useCategoriesByType(type) {
  const [cachedCategories, setCachedCategories] = useState({})
  const safeType = sanitizeSlug(type)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoryCtrl.getCategoriesByType(safeType)
        setCachedCategories((prevCachedCategories) => ({
          ...prevCachedCategories,
          [type]: categoriesResponse.data.categories,
        }))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    // Fetch categories only if they are not already cached for this type
    if (!cachedCategories[safeType]) {
      fetchCategories()
    }
  }, [safeType, cachedCategories])

  return { categories: cachedCategories[safeType] || [] }
}
