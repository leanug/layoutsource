import { useModalStore } from '@/store'

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
          ✕
        </button>
        <h3 className="font-bold text-lg">{modalTitle}</h3>
        {modalContent}
      </div>
    </div>
  ) : null
}
