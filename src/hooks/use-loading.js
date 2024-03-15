import { useRef } from 'react'

/**
 * A custom React hook for managing loading state.
 * @returns {Object} An object containing the loading state and functions to control it.
 * @property {boolean} loading - A boolean indicating whether the loading state is active (true) or not (false).
 * @property {Function} startLoading - A function to set the loading state to true, indicating the start of the loading process.
 * @property {Function} stopLoading - A function to set the loading state to false, indicating the end of the loading process.
 */
export function useLoading() {
  const loadingRef = useRef(false)

  const startLoading = () => {
    loadingRef.current = true
  }

  const stopLoading = () => {
    loadingRef.current = false
  }

  return {
    loading: loadingRef.current,
    startLoading,
    stopLoading,
  }
}
