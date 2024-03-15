import { useEffect, useState } from 'react'
import { Category } from '@/api'

const categoryCtrl = new Category()

export function useCategoriesByType(type) {
  const [cachedCategories, setCachedCategories] = useState({})

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoryCtrl.getCategoriesByType(type)
        setCachedCategories((prevCachedCategories) => ({
          ...prevCachedCategories,
          [type]: categoriesResponse.data,
        }))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    // Fetch categories only if they are not already cached for this type
    if (!cachedCategories[type]) {
      fetchCategories()
    }
  }, [type, cachedCategories])

  return { categories: cachedCategories[type] || [] }
}
