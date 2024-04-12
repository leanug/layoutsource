import { useContext } from 'react'

import { AuthContext } from '../../resources/contexts'

/**
 * A custom hook to access the authentication context.
 * @returns {Object} The authentication context value.
 */
export const useAuth = () => useContext(AuthContext)
