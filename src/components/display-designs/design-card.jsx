'use client'

import { useRouter } from 'next/navigation'

/**
 * Displays a design card with its buttons for logged users
 */
export function DesignCard({
  designInfo,
  designImage,
  actionLike,
  actionCollections,
}) {
  const router = useRouter()

  /*  const { handleModal } = useModalStore() */
  /*   const { showcaseModal, handleShowcaseModal } = useShowcaseStore() */

  

  // Restore the URL to its previous state, when showcase design modal is closed
  /* useEffect(() => {
    if (!showcaseModal) {
      window.history.pushState(null, null, router.asPath)
    }
  }, [showcaseModal, router])

  // Open a big modal for showcasing a big design
  const showcaseDesign = useCallback(
    (designSlug) => {
      // Use JavaScript history to navigate without page reload
      window.history.pushState(null, null, `/showcase/${designSlug}`)
      const data = { design, relatedDesigns: [] }
      const modalContent = (
        <div className="mb-20">
          <ShowcaseDesign design={data?.design} />
        </div>
      )

      handleShowcaseModal(true, modalContent)
    },
    [handleShowcaseModal, design],
  )
 */
  // Loading or no design
  return (
    <div className="transition h-full flex flex-col justify-between dark:text-white">
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
