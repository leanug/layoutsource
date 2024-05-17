'use client'

import { useEffect, useState } from 'react'

import { LoadingIndicator } from '@/components'

export function CollectionItem(props) {
  const { collection, designId, deleteDesign, addDesign } = props
  const [inCollection, setInCollection] = useState(false)
  const [loading, setLoading] = useState(false)

  // Check if design is in the collection
  function isInCollection(designs, designId) {
    return designs.some((design) => design === designId)
  }

  const handleCheckboxChange = async () => {
    // Don't run updates if loading
    if (loading) return

    setLoading(true)
    if (!inCollection) {
      const updateResult = await addDesign(collection._id, designId)
      updateResult && setInCollection(true)
    } else {
      const updateResult = await deleteDesign(collection._id, designId)
      updateResult && setInCollection(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    // Update the state based on the latest props
    setInCollection(isInCollection(collection.designs, designId))
  }, [collection, designId])

  return (
    <label className="flex flex-row group gap-3 h-10 rounded-lg items-center px-2 cursor-pointer">
      <input
        type="checkbox"
        checked={inCollection}
        className="checkbox"
        onChange={handleCheckboxChange}
      />
      <div className="w-full">{collection.title}</div>
      {loading && (
        <div className="mt-1">
          <LoadingIndicator />
        </div>
      )}
    </label>
  )
}
