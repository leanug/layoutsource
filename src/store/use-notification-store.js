// useNotificationStore.js
import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [
    {id: '1', type: 'error', message: 'Noti 1'},
    {id: '2', type: 'error', message: 'Noti 2'},
    {id: '3', type: 'error', message: 'Noti 3'},
    {id: '4', type: 'error', message: 'Noti 4'}
  ],
  addNotification: (message, type = 'info') =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), message, type }],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}))