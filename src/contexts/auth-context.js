import { createContext, useEffect, useState } from 'react'

import { Token, User } from '@/api'
import { useLoading } from '@/hooks'

export const AuthContext = createContext()

const tokenCtrl = new Token()
const userCtrl = new User()

export function AuthProvider(props) {
  const { children } = props
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const { loading, startLoading, stopLoading } = useLoading()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        startLoading()
        const storedToken = tokenCtrl.getToken()

        if (!storedToken) {
          logout()
          return
        }

        if (tokenCtrl.isTokenExpired(storedToken)) {
          logout()
        } else {
          await login(storedToken)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        stopLoading()
      }
    }

    initializeAuth()
  }, [])

  const login = async (token) => {
    try {
      startLoading()

      // Set the token in localStorage
      tokenCtrl.setToken(token)

      // Get user data
      const response = await userCtrl.getMe()

      // Set user data in the state
      setUser(response.data)

      // Set the token in the state
      setToken(token)
    } catch (error) {
      console.error('Error during login:', error)
      throw new Error(error)
    } finally {
      stopLoading()
    }
  }

  const logout = () => {
    // Remove the token from local storage
    tokenCtrl.removeToken()

    // Reset user and token states
    setUser(null)
    setToken(null)
  }

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    })
  }

  const data = {
    accessToken: token, // Corrected to use the actual token
    loading,
    login,
    logout,
    updateUser,
    user,
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
