import { useShowcaseStore } from '@/store'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing the 
 * modal or null if the modal is not active.
 */
export const ShowcaseModal = () => {
  const { modalContent, handleModal, modal } = useShowcaseStore();

  return modal ? (
    <div
      className="fixed top-0 left-0 h-full w-full overflow-y-scroll"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <div className="w-full h-full bg-inherit dark:text-white">
        <button
          className="font-bold self-end rounded-full  mb-3 bg-white text-red-700 w-8 h-8"
          onClick={() => handleModal()}
        >
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  ) : null
}
