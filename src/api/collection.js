import QueryString from 'qs'

import { authFetch, checkResponse, ENV, handleError, mapDesigns } from '@/utils'
import { Log } from './log'

const logCtrl = new Log()

export class Collection {
  /**
   * Get all the collections for a given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async getAll(userId, page) {
    try {
      const query = QueryString.stringify({
        fields: ['title', 'slug', 'totalDesigns'],
        sort: ['title:asc'],
        populate: {
          designs: {
            fields: ['cover'],
            populate: {
              cover: {
                fields: ['formats', 'height', 'name', 'url', 'width'],
              },
            },
          },
        },
        filters: {
          user: {
            id: userId,
          },
        },
        pagination: {
          page: page,
          pageSize: 30,
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COLLECTIONS}?${query}`
      const response = await authFetch(url)
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }
      const result = await response.json()

      return {
        data: result.data,
        success: true,
      } // Return the response data or status
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  async getBySlug({ userId, slug, page, itemsPerPage = 1 }) {
    try {
      const query = QueryString.stringify({
        fields: ['designs', 'title', 'totalDesigns', 'description'],
        populate: {
          designs: {
            fields: ['title', 'views', 'likes', 'slug'],
            populate: {
              cover: {
                fields: ['formats', 'height', 'name', 'url', 'width'],
              },
            },
            sort: ['updatedAt:desc'],
            limit: itemsPerPage,
            start: (page - 1) * itemsPerPage,
          },
        },
        filters: {
          user: {
            id: userId,
          },
          slug: {
            $eq: slug,
          },
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COLLECTIONS}?${query}`
      const response = await authFetch(url)
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()
      const { data } = result

      // Return false if collection does not exist
      if (!data[0]?.id) {
        return false
      }

      const paramData = data[0]?.attributes.designs.data || []

      const mappedDesigns = mapDesigns(paramData)

      const collectionInfo = {
        designs: mappedDesigns,
        collectionTitle: data[0]?.attributes.title || '',
        collectionDescription: data[0]?.attributes.description || '',
        collectionId: data[0]?.id || 0,
        totalDesigns: data[0]?.attributes.totalDesigns || 0,
      }

      return {
        data: collectionInfo,
        success: true,
      }
    } catch (error) {
      return handleError(error, logCtrl)
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
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COLLECTIONS}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      }

      const response = await authFetch(url, params)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      return {
        success: true,
        message: 'Collection created',
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /*
   * Add or remove designs from a given collection
   */
  async update(collectionId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COLLECTIONS}/${collectionId}`
      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      }

      const response = await authFetch(url, params)
      console.log('update data', data);
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      return {
        success: true,
        message: 'Collection updated',
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /*
   * Add or remove designs from a given collection
   */
  async delete(collectionId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COLLECTIONS}/${collectionId}`
      const params = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await authFetch(url, params)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      return {
        success: true,
        message: 'The collection was deleted',
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }
}
