import { 
  ENV, 
  authFetch,
  mapDesigns, 
  mapPagination
} from '@/utils'
import QueryString from 'qs'

export class Collection {
  /**
   * Get all the collections for a given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async getAll (userId, page) {
    try {
      const query = QueryString.stringify({
        fields: ['title', 'slug'],
        sort: ['title:asc'],
        populate: {
          designs: {
            fields: ['cover'],
            populate: {
              cover: {
                fields: ['formats', 'height', 'name', 'url', 'width']
              },
            },
          }
        },
        filters: {
          user: {
            id: userId
          }
        },
        pagination: {
          page: page,
          pageSize: 30,
        },
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

  async getBySlug ({ userId, slug, page }) {
    try {
      const query = QueryString.stringify({
        fields: ['designs', 'title'],
        populate: {
          designs: {
            fields: ['title', 'views', 'likes', 'slug'],
            populate: {
              cover: {
                fields: ['formats', 'height', 'name', 'url', 'width']
              },
            },
            sort: ['updatedAt:desc'],
           limit: 1,
           start: page,
          },
        },
        filters: {
          user: {
            id: userId
          },
          slug: {
            $eq: slug
          }
        },
      })
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.COLLECTIONS }?${ query }`

      const response = await authFetch(url)
      const result = await response.json()

      if (response.status !== 200) {
        // This throw statement will stop the execution
        throw new Error('HTTP Error: ' + response.status);
      }
      
      const { data, meta } = result
      
      // Return false if collection does not exist
      if (! data[0]?.id) {
        return false
      }

      const paramData = data[0]?.attributes.designs.data || []

      const mappedDesigns = mapDesigns(paramData)
      const mappedPagination = mapPagination(meta.pagination)
      
      return {
        designs: mappedDesigns,
        pagination: mappedPagination,
        collectionTitle: data[0]?.attributes.title || '',
        collectionId: data[0]?.id || 0
      }
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

  /* 
   * Add or remove designs from a given collection
   */
  async delete(collectionId) {
    console.log('collectionId', collectionId);
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.COLLECTIONS }/${ collectionId }`
      const params = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
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
