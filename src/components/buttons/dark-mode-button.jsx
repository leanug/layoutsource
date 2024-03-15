import { useDarkModeStore } from '@/store'
import { MoonSolid, SunSolid } from '@/components'

export function DarkModeButton() {
  const { darkMode, setDarkMode } = useDarkModeStore()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode) // Toggle dark mode state
  }

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={` font-bold  rounded-lg py-3 `}
      >
        {darkMode ? (
          <SunSolid className="w-6 h-6 fill-white" />
        ) : (
          <MoonSolid className="w-6 h-6 fill-gray-900" />
        )}
      </button>
    </>
  )
}
