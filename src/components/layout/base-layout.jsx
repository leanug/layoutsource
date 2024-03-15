import { useDarkMode } from '@/hooks'
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
  console.count('base layout')
  return (
    <div className={`relative ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 h-full">{children}</div>
    </div>
  )
}
