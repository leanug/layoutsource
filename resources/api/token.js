import { ENV } from '@/utils'
import jwtDecode from 'jwt-decode';

export class Token {
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token)
  }

  getToken() {
    return localStorage.getItem(ENV.TOKEN)
  }

  removeToken() {
    localStorage.removeItem(ENV.TOKEN)
  }

  isTokenExpired(token) {
    try {
      const decodedToken = jwtDecode(token);
  
      if (decodedToken && decodedToken.exp) {
        // Get the expiration timestamp in seconds
        const expirationTime = decodedToken.exp;
  
        // Get the current timestamp in seconds
        const currentTime = Math.floor(Date.now() / 1000);
  
        // Compare the expiration time with the current time
        return currentTime > expirationTime;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  
    return true; // Treat as expired if decoding fails or no expiration time found
  }
}