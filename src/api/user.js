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
   * Update user data asynchronously.
   * @param {string} userId - The ID of the user to update.
   * @param {object} data - The data to update for the user.
   * @returns {Promise<object>} A promise that resolves to an object with the result of the update.
   *                            If successful, the object contains { success: true, data: updatedUserData }.
   *                            If there's an error, the object contains { success: false, error: errorMessage }.
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
      // Return error message
      return handleError(error, logCtrl)
    }
  }
}
