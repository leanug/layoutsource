'use client'

import { useShowcaseDesignStore } from '@/store'

/**
 * Displays a design card with its buttons for logged users
 */
export function DesignCard({
  design,
  designInfo,
  designImage,
  actionLike,
  actionCollections,
}) {

  const { handleShowcaseDesign } = useShowcaseDesignStore()

  return (
    <div
      onClick={() => handleShowcaseDesign(true, design)}
      className="transition h-full flex flex-col justify-between"
    >
      <div className="w-full mb-4 relative group flex-grow overflow-hidden">
        {designImage}
        <div
          className={`
                absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              `}
        >
          <div className="flex flex-row gap-2.5">
            {actionCollections}
            {actionLike}
          </div>
        </div>
      </div>
      <div className="row-span-1">{designInfo}</div>
    </div>
  )
}
