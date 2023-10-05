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
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USERS_ME }?${ 'populate=*' }`
      const response = await authFetch(url) // uso authFetch porque es una peticion autenticada
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Updates the user information for the given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @param {Object} data - The data containing the updated user information.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async updateMe(userId, data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USERS }/${ userId }`
      const params = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const response = await authFetch(url, params)
      const result = await response.json()

      if (response.status !== 200 ) throw result

      return result
    } catch (error) {
      console.error(error)
    }
  }
}