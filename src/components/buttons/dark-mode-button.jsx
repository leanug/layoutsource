import { useDarkModeStore } from '@/store'
import { MoonSolid, SunSolid } from '@/components'

export function DarkModeButton({ buttonType }) {
  const { darkMode, setDarkMode } = useDarkModeStore()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode) // Toggle dark mode state
  }

  const renderIcon = () => {
    return darkMode ? (
      <SunSolid className="w-6 h-6 fill-white" />
    ) : (
      <MoonSolid className="w-6 h-6 fill-gray-900" />
    )
  }

  return (
    <>
      {buttonType === 'aside' ? (
        <button
          onClick={toggleDarkMode}
          className={`
            font-bold w-28 h-10 flex flex-row gap-2.5 items-center justify-center 
            rounded-lg py-3 border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 
            transition-colors ease-in
          `}
        >
          {renderIcon()}
          {buttonType === 'aside' && (
            <span className="ml-2">{darkMode ? 'Light' : 'Dark'}</span>
          )}
        </button>
      ) : (
        <button
          onClick={toggleDarkMode}
          className={`font-bold w-10 rounded-lg py-3`}
        >
          {renderIcon()}
        </button>
      )}
    </>
  )
}
