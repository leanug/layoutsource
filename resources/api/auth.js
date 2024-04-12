import { ENV, authFetch, handleError } from '@/utils'

export class Auth {
  /*
   * User registration
   */
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const response = await fetch(url, params)
      const result = await response.json()

      // Check if the request was successful
      if (!response.ok) {
        if (ENV.IS_DEV) {
          console.error('Register response OK error', response)
        }
        return {
          data: null,
          error: result.error,
          success: false,
        }
      }

      if (result?.jwt) {
        return {
          data: {
            jwt: result.jwt,
          },
          success: true,
        }
      }

      if (ENV.IS_DEV) {
        console.error('Register data error', response)
      }

      return {
        data: null,
        success: false,
      }
    } catch (error) {
      if (ENV.IS_DEV) {
        console.error('Register error', error)
      }

      return {
        success: false,
        error: {
          status: error?.status,
          message: error?.userMessage || 'Oops! An error occured',
        },
      }
    }
  }

  /*
   * User login
   */
  async login(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const response = await fetch(url, params)

      // Check if the request was successful
      if (!response.ok) {
        if (ENV.IS_DEV) {
          console.error('Login response OK error', response)
        }

        return {
          data: null,
          success: false,
        }
      }

      const result = await response.json()

      if (result?.jwt) {
        return {
          data: {
            jwt: result.jwt,
          },
          success: true,
        }
      }

      if (ENV.IS_DEV) {
        console.error('Login data error', response)
      }

      return {
        data: null,
        success: false,
      }
    } catch (error) {
      if (ENV.IS_DEV) {
        console.error('Login error', error)
      }

      return {
        success: false,
        error: {
          status: error?.status,
          message: error?.userMessage || 'Oops! An error occured',
        },
      }
    }
  }

  /*
   * Change user password
   */
  async changePassword(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.CHANGE_PASSWORD}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const response = await authFetch(url, params)
      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result?.error,
        }
      }

      return {
        data: result.data,
        success: true,
      }
    } catch (error) {
      if (ENV.IS_DEV) {
        console.error(error)
      }
    }
  }
}
