import { createContext, useEffect, useState } from "react";
import { Token, User } from "@/api";

export const AuthContext = createContext()

const tokenCtrl = new Token()
const userCtrl = new User()

export function AuthProvider(props) {
  const { children } = props
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    (async () => {
      const token = tokenCtrl.getToken()

      if (! token) {
        logout()
        setLoading(false)
        return
      }

      if (tokenCtrl.isTokenExpired(token)) {
        logout()
      } else {
        await login(token)
      }
    })()
    setLoading(false)
  }, [])

  const login = async (token) => {
    try {
      // Setear los datos en el localStorage
      tokenCtrl.setToken(token)
      // Obtener los datos del usuario
      const response = await userCtrl.getMe()
      console.log('getMe() response=', response);
      // Setear los datos del usuario en el estado user
      setUser(response)
      // Setear el valor del token en el state token
      setToken(token)
      
      // Hacer un setLoading false
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  /* 
   + Delete token from local storage and reset states
   */
  const logout = () => {
    tokenCtrl.removeToken()
    setToken(null)
    setUser(null)
  }

  const updateUser = (key, value) => {
    setUser({
      ...user, 
      [key]: value
    })
  }

  const data = {
    accessToken: null,
    user,
    login,
    logout,
    updateUser,
  }

  //if (login) return null

  return (
    <AuthContext.Provider value={ data }>
      { children }
    </AuthContext.Provider>
  )
}