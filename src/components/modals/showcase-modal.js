import { useShowcaseStore } from '@/store'
import { ArrowLeft } from '@/components'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing the
 * modal or null if the modal is not active.
 */
export const ShowcaseModal = () => {
  const { showcaseModalContent, handleShowcaseModal, showcaseModal } =
    useShowcaseStore()

  return showcaseModal ? (
    <div className="absolute top-0 left-0 h-full w-screen overflow-y-scroll bg-white dark:bg-gray-900 py-6 px-5">
      <div className="w-full h-full bg-inherit dark:text-white ">
        <button
          className="font-bold self-end rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 transition-colors ease-in mb-3 w-14 h-14 flex justify-center items-center"
          onClick={() => handleShowcaseModal()}
        >
          <ArrowLeft className="w-8 h-8 fill-gray-950 dark:fill-white mr-1" />
        </button>
        {showcaseModalContent}
      </div>
    </div>
  ) : null
}
