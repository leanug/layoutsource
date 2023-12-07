// useNotificationStore.js
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

export const useNotificationStore = create((set) => ({
  notifications: [],  // Initialize notifications array
  addNotification: (message, type = 'info') =>
    set((state) => ({
      notifications: [...state.notifications, { id: uuidv4(), message, type }],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}))