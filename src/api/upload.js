import {
  authFetch,   
  checkResponse,
  ENV, 
  handleError,
} from '@/utils'

import { Log } from './log'

const logCtrl = new Log()

/**
 * Represents a User.
 */
export class Upload {
  /**
   * Uploads files to Strapi.
   * @returns {Promise<Object>} A promise that resolves to the user information.
   */
  async upload(data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.UPLOAD }`
      const params = {
        method: 'POST',
        body: data
      }
      
      const response = await authFetch(url, params)
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }
      const result = await response.json()
      
      return { 
        success: true, 
        data: result
      } 
    } catch(error) {
      return handleError(error, logCtrl)
    }
  }
}