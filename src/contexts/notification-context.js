import { Notification } from "@/components"
import PropTypes from "prop-types";
import React from "react";
import { useNotification } from "@/hooks"

/**
 * Context for managing notifications and providing them to child components.
 * @type {React.Context}
 */
let NotificationContext
let { Provider } = (NotificationContext = React.createContext())

/**
 * NotificationProvider component for managing notifications in the application.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap with notification context.
 */
let NotificationProvider = ({ children }) => {
  let { 
    notification, 
    handleNotification, 
    notificationData 
  } = useNotification()

  const contextValue = { 
    notification, 
    handleNotification, 
    notificationData 
  }

  return (
    <Provider value={ contextValue }>
      <Notification />
      {children}
    </Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { NotificationContext, NotificationProvider };