import React from 'react';
import ReactDOM from 'react-dom';
import { NotificationContext } from "@/contexts";

export const Notification = () => {
  let { 
    notificationData, 
    handleNotification, 
    notification 
  } = React.useContext(NotificationContext);
  
  if (notification) {
    const { message = '', type = 'info' } = notificationData || {};

    let backgroundColor;
    if (type === 'error') {
      backgroundColor = 'bg-red-500';
    } else if (type === 'info') {
      backgroundColor = 'bg-blue-500';
    } else if (type === 'success') {
      backgroundColor = 'bg-green-500';
    }

    return ReactDOM.createPortal(
        <div className={`${backgroundColor} text-white ${backgroundColor} max-w-2xl w-full absolute z-50 left-1/2 transform -translate-x-1/2 bottom-10 p-5 shadow-lg rounded flex flex-row justify-between items-start text-lg transition-transform duration-500 ease-in-out`}>
          { message }
          <button
            className="font-bold self-end rounded-full  mb-3 bg-white text-red-700 w-8 h-8"
            onClick={() => handleNotification()}
          >
            &times;
          </button>
        </div>,
      document.querySelector("#notification-root")
    );
  } else return null;
};
