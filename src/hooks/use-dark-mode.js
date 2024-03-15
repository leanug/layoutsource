import { useDarkModeStore } from '@/store'
import { useEffect } from 'react'

const DARK_MODE_KEY = 'layoutloom_darkmode' // Define the key for localStorage

export function useDarkMode() {
  const { darkMode, setDarkMode } = useDarkModeStore()

  useEffect(() => {
    const setupTheme = () => {
      // Check for previous localStorage saves
      if (typeof window !== 'undefined' && localStorage) {
        const storedTheme = localStorage.getItem(DARK_MODE_KEY)
        const theme = storedTheme === 'true' ? true : false // Convert the stored string to a boolean

        // Use the boolean value to set the dark mode
        setDarkMode(theme)
      }
    }

    // Call setupTheme function
    setupTheme()
  }, [setDarkMode])

  // Function to update localStorage when darkMode value changes
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage) {
      console.log('set item darkmode=', darkMode);
      localStorage.setItem(DARK_MODE_KEY, darkMode.toString()) // Convert boolean to string before saving
    }
  }, [darkMode])
}
