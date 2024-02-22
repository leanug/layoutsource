import { useShowcaseStore } from '@/store'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing the 
 * modal or null if the modal is not active.
 */
export const ShowcaseModal = () => {
  const { showcaseModalContent, handleShowcaseModal, showcaseModal } =
    useShowcaseStore()

  return showcaseModal ? (
    <div className="absolute top-0 left-0 h-full w-screen overflow-y-scroll bg-slate-700 py-6 px-5">
      <div className="w-full h-full bg-inherit dark:text-white ">
        <button
          className="font-bold self-end rounded-full  mb-3 bg-white text-red-700 w-8 h-8"
          onClick={() => handleShowcaseModal()}
        >
          &times;
        </button>
        {showcaseModalContent}
      </div>
    </div>
  ) : null
}
