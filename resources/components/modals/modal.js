import { useModalStore } from '@/store'
import { XmarkSolid } from '../../../src/components/icons'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
export const Modal = () => {
  const { modalContent, modalTitle, handleModal, modal } = useModalStore()

  return modal ? (
    <>
      <div
        className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center z-30"
        style={{ background: 'rgba(0,0,0,0.6)' }}
      >
        <div className="bg-white dark:bg-gray-950 w-full max-w-screen-sm shadow-lg rounded-xl text-lg p-8 border border-gray-200 dark:border-gray-500">
          <div className="flex items-center gap-10 justify-between w-full mb-3 text-gray-950 dark:text-white">
            <h1 className="text-xl font-semibold">{modalTitle}</h1>
            <button onClick={() => handleModal()}>
              <XmarkSolid className="w-10 h-10 fill-gray-950 dark:fill-white" />
            </button>
          </div>
          {modalContent}
        </div>
      </div>
    </>
  ) : null
}
