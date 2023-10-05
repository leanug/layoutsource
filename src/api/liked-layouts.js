import { ENV, authFetch } from '@/utils'

export class LikedLayouts {
  /**
   * Checks if the specified design is liked by the user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} layoutId - The ID of the layout to be checked.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the layout is liked, or `false` if it is not liked.
   * @throws {Error} If an error occurs during the check process.
   */
  async check (userId, layoutId) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${ userId }`
      const filterLayout = `filters[layout][id][$eq][1]=${ layoutId }`
      const urlParams = `${ filterUser }&${ filterLayout }`
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LIKED_LAYOUTS }?${ urlParams }`

      const response = await authFetch(url, urlParams)
      const result = await response.json()

      if (response.status !== 200 ) throw result

      if (result.data.length === 0) return false

      return result.data[0]
    } catch (error) {
      console.error(error)
    }
  }  

  async add (userId, layoutId) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LIKED_LAYOUTS }`
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user: userId,
            layout: layoutId,
          }
        })
      }
      // Send a request to the server to like the layout
      const response = await authFetch(url, params);
      // Handle the response
      const result = await response.json()

      if (response.status !== 200) {
        // Handle the error here, for example, log it
        console.error('Error deleting liked layout:', result);
        throw new Error('Failed to delete liked layout');
      }
  
      return result.data; // Return the response data or status
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while deleting a liked layout');
    }
  }

  async delete (id) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LIKED_LAYOUTS }/${ id }`
      const params = {
        method: 'DELETE',
      }
      // Send a request to the server to delete the layout
      const response = await authFetch(url, params);
      // Handle the response
      const result = await response.json()

      if (response.status !== 200) {
        // Handle the error here, for example, log it
        console.error('Error deleting liked layout:', result);
        throw new Error('Failed to delete liked layout');
      }
  
      return result; // Return the response data or status
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while deleting a liked layout');
    }
  }

  /**
   * Get all the liked layouts for a given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async getAll (userId) {
    try {
      const filters = `filters[user][id][$eq]=${ userId }`
      const populate = `populate[0]=layout&populate[1]=layout.cover`
      const urlParams = `${ filters }&${ populate }`
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LIKED_LAYOUTS }?${ urlParams }`

      const response = await authFetch(url)
      const result = await response.json()

      if (response.status !== 200) {
        console.error('Error retrieving liked layout list:', result);
        throw new Error('Failed to retrieve liked layout list');
      }
  
      return result.data; // Return the response data or status
    } catch (error) {
      console.error(error)
    }
  }  
}