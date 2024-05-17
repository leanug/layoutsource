'use client'

import React, { useEffect } from 'react'

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

export const Notification = ({ id, message, type, removeNotification }) => {
  let alertModifier

  if (type === 'error') {
    alertModifier = 'alert-error'
  } else if (type === 'success') {
    alertModifier = 'alert-success'
  } else if (type === 'warning') {
    alertModifier = 'alert-warning'
  } else {
    alertModifier = 'alert-info'
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
      <InformationCircleIcon className="w-5 h-5" />
      <span>{message}</span>
      <button className="btn btn-sm" onClick={handleClose}>
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
