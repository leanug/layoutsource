'use client'

import { BookmarkIcon } from '@heroicons/react/24/outline'

import { useModalStore } from '@/store'

export function CollectionsToggleButton({ collection }) {
  const { handleModal } = useModalStore()

  const handleClick = () => {
    handleModal({
      modal: true,
      modalContent: collection,
      modalTitle: 'Collections',
    })
  }

  return (
    <button
      onClick={(event) => {
        handleClick()
        event.stopPropagation()
      }}
      className="btn z-30"
    >
      <BookmarkIcon className="h-6 w-6 " />
    </button>
  )
}
