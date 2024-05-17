'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export const useRelatedDesignsData = ({ tags, subcategories }) => {
  const [designs, setDesigns] = useState([])

  let firstTag = '' 
  let secondTag = ''
  let subcategory = ''
  console.log('tags', tags);
  console.log('subcategories', subcategories)
  // Extract up to two tags
  if (tags !== undefined || subcategories !== undefined) {
    firstTag = tags[0] || ''
    secondTag = tags[1] || ''
    subcategory = subcategories[0]
  }

  /**
   * useEffect to fetch and update related designs based on tags.
   */
  useEffect(() => {
    if ((!firstTag && !secondTag) || !subcategory) return
    console.log('fetch relared designs USE EFFECT')
    ;(async () => {
      // Use subcategory if both tags are empty strings

      const filterData =
        firstTag || secondTag ? [firstTag, secondTag] : [subcategory]

      const response = await axios.post('/api/designs/get', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { filterData, limit: 4 },
      })

      if (response.status === 200) {
        console.log('Response:', response.data)
        setDesigns(response.data.designs)
      } else {
        console.error('Error fetching designs:', response.status)
      }
    })()
  }, [firstTag, secondTag, subcategory]) // Use joined string as dependency to avoid infinite loop

  return { designs }
}
