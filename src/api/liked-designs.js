import { 
  ENV, 
  authFetch,
  mapDesigns, 
  mapPagination
} from '@/utils'
import QueryString from 'qs'

export class LikedDesigns {
  /**
   * Checks if the specified design is liked by the user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} designId - The ID of the layout to be checked.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the layout is liked, or `false` if it is not liked.
   * @throws {Error} If an error occurs during the check process.
   */
  async check (userId, designId) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${ userId }`
      const filterLayout = `filters[layout][id][$eq][1]=${ designId }`
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

  async add (userId, designId) {
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
            layout: designId,
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
  async get ({ userId, page }) {
    try {
      const query = QueryString.stringify({
        populate: {
          layout: {
            fields: ['title', 'likes', 'views', 'id', 'slug'],
            populate: {
              cover: {
                fields: ['formats', 'height', 'name', 'url', 'width']
              }
            }
          }
        },
        filters: {
          user: {
            id: {
              $eq: userId
            }
          }
        },
        sort: ['updatedAt:desc'],
        pagination: {
          page: page,
          pageSize: 1,
        }
      })
      
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LIKED_LAYOUTS }?${ query }`

      const response = await authFetch(url)
      const result = await response.json()

      if (response.status !== 200) {
        if(ENV.IS_DEV) {
          console.error('API request failed', result)
        }
        return null
      }

      const { data, meta } = result
      
      // Extract designs
      const designs = data.map(item => item.attributes.layout.data)
      
      const mappedDesigns = mapDesigns(designs)
      const mappedPagination = mapPagination(meta.pagination)
      return {
        designs: mappedDesigns,
        pagination: mappedPagination,
      }
    } catch (error) {
      if(ENV.IS_DEV) {
        console.error(error)
      }
      return {
        error: "An error occurred while fetching the data.",
      };
    }
  }  
}