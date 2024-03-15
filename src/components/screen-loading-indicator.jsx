import { LoadingIndicator } from '@/components'

export const ScreenLoadingIndicator = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
      <LoadingIndicator />
    </div>
  )
}
