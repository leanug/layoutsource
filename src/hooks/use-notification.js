import { useState, useEffect } from "react";

/**
  * A custom React hook for managing notifications.
  * @returns {{
  *   notification: boolean,
  *   handleNotification: (notificationData: { message?: string, type?: string }) => void,
  *   notificationData: { message: string, type: string }
  * }} - An object containing notification state and functions.
  * - `notification`: A boolean representing whether the notification is currently visible.
  * - `handleNotification`: A function to toggle and set the notification data.
  * - `notificationData`: An object containing the current notification message and type.
  */
export function useNotification() {
  let [notification, setNotification] = useState(false);
  const defaultNotification = { message: '', type: 'info' }
  let [notificationData, setNotificationData] = useState(defaultNotification)

  /* Close notifications after a few seconds */
  useEffect(() => {
    if(notification) {
      const timer = setTimeout(() => {
        setNotification(false)
      }, 3600)
  
      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification])

  let handleNotification = ({ message = '', type = 'info' } = {}) => {
    setNotification(prevNotification => ! prevNotification);
    if (message && type) {
      setNotificationData({ message, type });
    }
  };

  return { notification, handleNotification, notificationData };
}