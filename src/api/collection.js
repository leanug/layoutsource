import { ENV, authFetch } from '@/utils'
import qs from 'qs'

export class Collection {
  /**
   * Get all the collections for a given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async getAll (userId) {
    try {
      const query = qs.stringify({
        fields: ['title'],
        sort: ['title:asc'],
        populate: {
          designs: {
            populate: {
              image: {
                fields: ['url']
              }
            }
          }
        },
        filters: {
          user: {
            id: userId
          }
        }
      })
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.COLLECTIONS }?${ query }`

      const response = await authFetch(url)
      const result = await response.json()

      if (response.status !== 200) {
        console.error('Error retrieving collection list:', result);

        // Return an error object if there's an exception
        return { 
          data: null, 
          error: 'Failed to retrieve collection list' 
        };
      }
    
      return { data: result.data }; // Return the response data or status
    } catch (error) {
      if(ENV.IS_DEV)
        console.error(error);

      // Return an error object if there's an exception
      return { 
        data: null, 
        error: 'An error occurred while fetching data' 
      };
    }
  }  

  /**
   * Create a new collection.
   * @param {Object} data - The data for the new collection.
   * @param {string} data.title - The title of the collection.
   * @param {string} data.description - The description of the collection (optional).
   * @returns {Promise<{ data: Object | null, error: string | null }>} - A promise that resolves with the result of the collection creation.
   * - If successful, the promise resolves with `{ data: Object, error: null }`.
   * - If there is an error, the promise resolves with `{ data: null, error: string }`.
   */
  async create(data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.COLLECTIONS }`
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
        if(ENV.IS_DEV) {
          console.error('Error creating collection: ', result)
        }
      }
      
      return result
    } catch(error) {
      if(ENV.IS_DEV) {
        console.error('Error creating collection: ',error)
      }
    }
  }
  /* 
   * Add or remove designs from a given collection
   */
  async update(collectionId, data) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.COLLECTIONS }/${ collectionId }`
      const params = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
      }

      const response = await authFetch(url, params)
      const result = await response.json()

      if (response.status !== 200) {
        if(ENV.IS_DEV) {
          console.error('Error while adding design: ', result)
        }
      }
      
      return result
    } catch(error) {
      if(ENV.IS_DEV) {
        console.error('Error while adding design: ', error)
      }
    }
  }
}
