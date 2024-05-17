import { useModalStore } from '@/store'
import { XMarkIcon } from '@heroicons/react/24/solid'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
export const Modal = () => {
  const { modalContent, modalTitle, handleModal, modal } = useModalStore()

  return modal ? (
    <div className="modal z-30" open>
      <div className="modal-box">
        <button
          onClick={() => handleModal()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h3 className="font-bold text-lg">{modalTitle}</h3>
        {modalContent}
      </div>
    </div>
  ) : null
}
