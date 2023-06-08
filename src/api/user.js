import { ENV, authFetch } from '@/utils'

/**
 * Represents a User.
 */
export class User {
  /**
   * Retrieves information about the current user.
   * @returns {Promise<Object>} A promise that resolves to the user information.
   */
  async getMe() {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USERS_ME }`
      const response = await authFetch(url)
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }
}