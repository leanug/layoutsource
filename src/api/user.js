import { authFetch, checkResponse, ENV, handleError } from '@/utils'
import { Log } from './log'

const logCtrl = new Log()

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
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}?${'populate=*'}`

      const response = await authFetch(url) // Authenticated petition
      await checkResponse(response)
      const result = await response.json()

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      return handleError(error, logCtrl)
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
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`
      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const response = await authFetch(url, params)
      await checkResponse(response)
      const result = await response.json()

      return {
        success: true,
        data: result,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }
}
