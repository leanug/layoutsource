import { NotificationList } from './notification-list'

export const Notification = () => {
  return (
    <aside
      className={`
        max-w-2xl w-full absolute z-50 
        left-1/2 transform -translate-x-1/2 top-10  text-lg transition-transform 
        duration-500 ease-in-out
      `}
    >
      <NotificationList />
    </aside>
  )
}
