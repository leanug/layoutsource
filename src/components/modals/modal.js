import { useModalStore } from '@/store'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing the modal or null if the modal is not active.
 */
export const Modal = () => {
  const { 
    modalContent, 
    modalTitle, 
    handleModal, 
    modal 
  } = useModalStore()

  return modal ? (
    <div
      className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
        <div className="flex items-center justify-between w-full mb-3">
          <h2 className="text-xl font-bold">{ modalTitle }</h2>
          <button
            className="font-bold rounded-full bg-white text-red-700 w-8 h-8"
            onClick={() => handleModal()}
          >
            &times;
          </button>
        </div>
        { modalContent }
      </div>
    </div>
  ) : null
}