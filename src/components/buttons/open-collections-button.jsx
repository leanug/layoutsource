import { BookmarkRegular } from '@/components'

export const OpenCollectionsButton = ({ designId, onClick }) => {
  return (
    <button
      className={`
        bg-white border border-gray-200 text-gray-900 w-12 h-12 rounded-md
        hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300
        transition-colors ease-in flex items-center justify-center
      `}
      onClick={() => onClick(designId)}
    >
      <BookmarkRegular className={`w-5 h-5`} />
    </button>
  )
}
