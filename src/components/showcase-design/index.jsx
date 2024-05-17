'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

import { useShowcaseDesignStore, useUserStore } from '@/store'
import { useRelatedDesignsData } from '@/hooks'
import fallbackImg from '@/assets/images/default.png'
import Header from './header'
import Close from './close'

export function ShowcaseDesign() {
  const pathname = usePathname()

  const pathnameRef = useRef(pathname)

  const { isOpen, designData, handleShowcaseDesign } = useShowcaseDesignStore()
  const { user } = useUserStore()

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if (isOpen) {
      if (!/\/showcase\//.test(pathname)) {
        pathnameRef.current = pathname // Save original pathname to go back to
      }
      window.history.pushState(null, null, `/showcase/${designData.slug}`)
    }
  }, [isOpen, designData, pathname])

  const handleCloseShowcaseDesign = () => {
    window.history.pushState(null, null, pathnameRef.current)
    handleShowcaseDesign(false, {})
  }
  console.log('designData tags', designData.tags)
  // Fetch related designs
  const relatedDesigns = useRelatedDesignsData(
    designData?.tags || [],
    designData.subcategories,
  )
  console.log('relatedDesigns', relatedDesigns);
  if (!isOpen) return null

  return designData?.image ? (
    <div className="absolute top-0 left-0 w-full px-2.5 h-full bg-base-100 no-animation z-10">
      <Close handleCloseShowcaseDesign={handleCloseShowcaseDesign} />
      <div className="h-24 w-full"></div>
      <Header user={user} designData={designData} />
      {/* Design image */}
      <div className="relative w-full h-full">
        <Image
          src={designData?.image || fallbackImg} // Path to your image in the public folder
          alt={designData?.title || 'Image'} // Make sure title is available or provide a fallback alt text
          className="rounded-lg p-0 m-0" // Responsive image styles
          fill // Set layout to fill to ensure the image fills its container
          style={{
            objectFit: 'contain', // Maintain proportions without deforming the image
            objectPosition: 'center', // Center the image
          }}
          priority={false}
          sizes="(max-width: 1200px) 100vw, 1200px" // Adjust sizes for different screen widths
        />
      </div>
      {/* End Design image */}
      <div className="h-10 w-full"></div>
      <div className="divider">Related</div>
      <div className="h-10 w-full"></div>
    </div>
  ) : (
    <div>Oops! Design not found.</div>
  )
}
