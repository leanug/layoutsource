import { 
  ENV, 
  authFetch,
} from '@/utils'

export class Log {
  /**
   * Log errors in Strapi logs collection
   * @param {Object} errorData - The error data to be logged.
   * @param {string} errorData.message - The error message.
   * @param {string} errorData.eventLevel - The level of the error (e.g., 'ERROR', 'WARNING', 'INFO').
   * @param {number} errorData.userId - The ID of the user associated with the error.
   * @param {Object} errorData.details - Additional details about the error.
   * @returns {Promise<{ data: Object | null, error: string | null }>} - A promise that resolves with the result of the collection creation.
   */
  async create(data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LOGS }`
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
      }

      const response = await authFetch(url, params)
      const result = await response.json()

      if (response.status !== 200) {
        throw new Error(result)
      }
    } catch(error) {
      if(ENV.IS_DEV) {
        console.error('Error creating log: ', error)
      }
    }
  }
}
