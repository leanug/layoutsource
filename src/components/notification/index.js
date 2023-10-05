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

    return ReactDOM.createPortal(
        <div className="bg-white border absolute z-50 right-10 bottom-10 p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <button
            className="font-bold self-end rounded-full  mb-3 bg-white text-red-700 w-8 h-8"
            onClick={() => handleNotification()}
          >
            &times;
          </button>
          { message }
        </div>,
      document.querySelector("#notification-root")
    );
  } else return null;
};
