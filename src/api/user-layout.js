import QueryString from 'qs'

import { ENV, authFetch, handleError, checkResponse } from '@/utils'

export class UserLayout {
  /**
   * Updates the user information for the given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @param {Object} data - The data containing the updated user information.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async create(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_LAYOUTS}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
          },
        }),
      }
      const response = await authFetch(url, params)
      await checkResponse(response)
      const result = await response.json()

      return {
        success: true,
        data: result.data,
      }
    } catch (error) {
      return handleError(error)
    }
  }

  async get(userId, page = 1) {
    try {
      const query = QueryString.stringify({
        fields: ['url', 'status', 'title'],
        filters: {
          user: {
            id: {
              $eq: userId,
            },
          },
        },
        sort: ['updatedAt:desc'],
        pagination: {
          page: page,
          pageSize: 150,
        },
      })
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_LAYOUTS}?${query}`

      const response = await authFetch(url)
      await checkResponse(response)
      const result = await response.json()

      return {
        success: true,
        data: result.data,
      }
    } catch (error) {
      return handleError(error)
    }
  }
}
