import { ENV, authFetch } from '@/utils'

export class UserLayout {
  /**
   * Updates the user information for the given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @param {Object} data - The data containing the updated user information.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async create (userId, data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER_LAYOUTS }`
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: {
          ...data,
          user: userId
        }
        })
      }
      const response = await authFetch(url, params)
      const result = await response.json()

      if (response.status !== 200 ) throw result

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getAll (userId) {
    try {
      const filters = `filters[user][id][$eq]=${ userId }`
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.USER_LAYOUTS }?${ filters }`

      const response = await authFetch(url) // uso authFetch porque es una peticion autenticada
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }
}