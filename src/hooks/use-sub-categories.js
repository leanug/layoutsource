'use client'

import { useEffect, useState } from 'react'

import { sanitizeSlug } from '@/utils'
import { useSubCategoriesStore } from '@/store'

export function useSubCategories(parentSlug) {
  const [loading, setLoading] = useState(true)
  const { subCategories, setSubCategories } = useSubCategoriesStore()

  // Sanitize parent category slug
  const safeParentSlug = sanitizeSlug(parentSlug)

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/subcategories/get-by-parent-slug', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ parentSlug: safeParentSlug }),
        })

        if (response.ok) {
          const data = await response.json()
          setSubCategories(safeParentSlug, data) // save in sub categories store
        }
      } finally {
        setLoading(false)
      }
    }

    // Fetch sub categories only if they are not already cached for this type
    // Check if subcategories are already cached for this parentSlug
    if (!subCategories[safeParentSlug] && safeParentSlug) {
      fetchSubcategories()
    }
  }, [safeParentSlug, setSubCategories, subCategories])

  return { loading, subCategories: subCategories[safeParentSlug] || [] }
}
