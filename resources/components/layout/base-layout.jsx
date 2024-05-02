import { useDarkMode, useFetchLikedDesigns } from '@/hooks'
import { useDarkModeStore } from '@/store'

/**
 * Renders a common layout to all pages.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render within the layout.
 * @returns {ReactNode} The rendered authentication layout.
 */
export const BaseLayout = ({ children }) => {
  useDarkMode()
  const { darkMode } = useDarkModeStore()
  console.log('fetched liked designs')
  useFetchLikedDesigns('6618479f3c2188cfe0f324c3')

  return (
    <div data-theme={`${darkMode ? 'dark' : 'light'}`} className="relative">
      <div className="h-full">{children}</div>
    </div>
  )
}
