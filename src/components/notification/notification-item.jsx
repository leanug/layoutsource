import React, { useEffect } from 'react'

import { InfoSolid, XmarkSolid } from '@/components'

export const Notification = ({ id, message, type, removeNotification }) => {
  let alertModifier

  if (type === 'error') {
    alertModifier = 'alert-error'
  } else if (type === 'info') {
    alertModifier = 'alert-info'
  } else if (type === 'success') {
    alertModifier = 'alert-success'
  } else if (type === 'warning') {
    alertModifier = 'alert-warning'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatically close the notification after a few seconds
      removeNotification(id)
    }, 5000) // Adjust the duration as needed

    return () => clearTimeout(timer)
  }, [id, removeNotification])

  const handleClose = () => {
    // Close the notification when the close button is clicked
    removeNotification(id)
  }

  return (
    <div role="alert" className={`alert ${alertModifier}`}>
      <InfoSolid className="w-8 h-8 fill-gray-950" />
      <span>{message}</span>
      <button className="btn btn-sm" onClick={handleClose}>
        <XmarkSolid className="w-4 h-4 fill-gray-950" />
      </button>
    </div>
  )
}
