export const ConfirmationDialog = (props) => {
  const { 
    onConfirm = () => {}, 
    onCancel = () => {}, 
    handleModal 
  } = props

  const handleConfirm = () => {
    onConfirm();
    handleModal(); // Close the modal after confirmation
  };

  const handleCancel = () => {
    onCancel();
    handleModal(); // Close the modal after cancelation
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-lg text-gray-800 mb-4">Are you sure you want to delete this collection?</p>
      <div className="flex space-x-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};