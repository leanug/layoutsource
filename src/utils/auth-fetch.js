/**
 * Module for handling authenticated API requests and persistent session.
 * Retrieves the authentication token from local storage and includes it in the headers of API requests.
 * Fetches user data from the API to make the session persistent.
 * @module auth-fetch
 */

import { Token } from "@/api"

export async function authFetch(url, params) {
  // Get the JWT token from storage
  const tokenCtrl = new Token()
  const token = tokenCtrl.getToken()

  const logout = () => {
    tokenCtrl.removeToken()
    window.location.replace('/')
  }

  // If no token is found, handle the logout flow
  if (! token) {
    logout()
  } else {
    // Check if the token is expired
    const isTokenExpired = tokenCtrl.isTokenExpired(token)
    
    // If the token is expired, handle the logout flow
    if (isTokenExpired) {
      logout()
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${ token }`
        }
      }

      try {
        // Send the authenticated request with the token and authorization
        return await fetch(url, paramsTemp)
      } catch (error) {
        return error
      }
    }
  }
}

export default authFetch;
