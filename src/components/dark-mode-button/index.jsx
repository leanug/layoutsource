import { useDarkModeStore } from '@/store'
import { MoonSolid, SunSolid } from '@/components'

export function DarkModeButton() {
  const { darkMode, toggleDarkMode } = useDarkModeStore()

  const darkModeHandler = () => {
    toggleDarkMode()
  }

  return (
    <button
      onClick={darkModeHandler}
      className={`
        bg-gray-50 hover:bg-gray-100 font-bold 
         pl-4 pr-[14px] rounded-lg dark:bg-gray-700 py-3
      `}
    >
      {darkMode ? (
        <MoonSolid className="w-5 h-5 fill-white" />
      ) : (
        <SunSolid className="w-5 h-5 fill-gray-700" />
      )}
    </button>
  );
}