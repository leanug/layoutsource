import { useState, useCallback } from 'react'

/**
 * A custom React hook for managing loading state.
 * @returns {Object} An object containing the loading state and functions to control it.
 * @property {boolean} loading - A boolean indicating whether the loading state is active (true) or not (false).
 * @property {Function} startLoading - A function to set the loading state to true, indicating the start of the loading process.
 * @property {Function} stopLoading - A function to set the loading state to false, indicating the end of the loading process.
 */

function persistItem(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
  return value
}

export function usePersistState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || persistItem(key, initialValue)
    }
    return initialValue
  })

  const setStateAndPersist = useCallback(
    (newState) => {
      setState(newState)
      if (typeof window !== 'undefined') {
        persistItem(key, newState)
      }
    },
    [key, setState],
  )

  return [state, setStateAndPersist]
}
