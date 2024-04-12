import React from 'react'
import {useNotificationStore} from '@/store'
import { Notification } from './notification-item'

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotificationStore()
  
  return (
    <div>
      {
        notifications?.map((notification) => (
          <Notification 
            key={notification.id} 
            id={notification.id} 
            message={notification.message} 
            type={ notification.type }
            removeNotification={ removeNotification }
          />
        ))
      }
    </div>
  )
}