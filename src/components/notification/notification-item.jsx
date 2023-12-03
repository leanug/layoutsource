import React, { useEffect } from 'react';

export const Notification = ({ id, message, type, removeNotification }) => {
  let backgroundColor

  if (type === 'error') {
    backgroundColor = 'bg-red-500';
  } else if (type === 'info') {
    backgroundColor = 'bg-blue-500';
  } else if (type === 'success') {
    backgroundColor = 'bg-green-500';
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatically close the notification after a few seconds
      removeNotification(id);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  const handleClose = () => {
    // Close the notification when the close button is clicked
    removeNotification(id);
  };

  return (
    <div className={`${ backgroundColor } text-white p-5 shadow-lg my-2 rounded flex flex-row justify-between items-start ${ backgroundColor }`}>
      { message }
      <button
        className="font-bold self-end rounded-full bg-white text-red-700 w-8 h-8"
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  )
}
