import QueryString from 'qs'

import {
  checkResponse,
  handleError,
  ENV,
  authFetch,
  mapDesigns,
  mapPagination,
} from '@/utils'
import { Log } from './log'

const PAGE_SIZE = 4

const logCtrl = new Log()

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
  async check(userId, designId) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${userId}`
      const filterLayout = `filters[layout][id][$eq][1]=${designId}`
      const urlParams = `${filterUser}&${filterLayout}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LIKED_LAYOUTS}?${urlParams}`

      const response = await authFetch(url, urlParams)
      const result = await response.json()

      if (response.status !== 200) throw result

      if (result.data.length === 0) return false

      return result.data[0]
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetches all liked design IDs for a given user.
   *
   * @param {number} userId - The ID of the user for whom liked designs are to be fetched.
   * @returns {Promise<{ success: boolean, data: number[] }>} A promise that resolves to an object
   * with a `success` boolean indicating whether the operation was successful and a `data` array
   * containing the IDs of liked designs for the user.
   *
   * @throws {Error} If there's an issue with the network request or the response is not as expected.
   * @throws {CustomError} If there's a custom error during the process (handled by `handleError`).
   *
   * @example
   * const userId = 123;
   * const result = await likedDesignCtrl.getAll(userId);
   * // Example result: { success: true, data: [1, 2, 3] }
   */
  async getAll(userId) {
    try {
      const query = QueryString.stringify({
        populate: {
          layout: {
            fields: ['id'],
          },
        },
        filters: {
          user: {
            id: {
              $eq: userId,
            },
          },
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LIKED_LAYOUTS}?${query}`

      const response = await authFetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()

      /**
       * Transform an array of liked design data into an object for quick lookups.
       *
       * The resulting object maps each design id (key) to its corresponding collection item id
       * (value) containing information about the liked design and user.
       *
       * @param {Array} result.data - An array of liked design data obtained from the server.
       * @returns {Object} likedDesignsObj - An object where each designId maps directly
       *   to its associated likedDesignCollectionItemId.
       */
      const likedDesignsObj = result.data.reduce((acc, item) => {
        // Extract designId from the current liked design item
        const designId = item.attributes.layout.data.id

        // Map designId to its associated likedDesignCollectionItemId in the accumulator object
        acc[designId] = item.id

        // Return the updated accumulator for the next iteration
        return acc
      }, {})

      return {
        data: likedDesignsObj,
        success: true,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /**
   * Asynchronously adds a liked design layout for a user.
   *
   * It adds a pair of user and design elements to the Liked designs collection
   *
   * @async
   * @function
   * @param {number} userId - The ID of the user liking the design layout.
   * @param {number} designId - The ID of the design layout to be liked.
   * @returns {Promise<{ success: boolean, data: { likedLayoutsCollectionItemId: number } }>} A Promise that resolves to an object with the success status and data returned from the server.
   *   @property {boolean} success - Indicates the success status of the operation.
   *   @property {Object} data - Data returned from the server after liking the layout.
   *     @property {number} likedLayoutsCollectionItemId - The ID related to the liked design layout in the Liked Layouts collection.
   * @throws {Error} Throws an error if there is an issue with the request or server response.
   */
  async add(userId, designId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LIKED_LAYOUTS}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            user: userId,
            layout: designId,
          },
        }),
      }
      // Send a request to the server to like the layout
      const response = await authFetch(url, params)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()
      const data = { likedLayoutsCollectionItemId: result.data.id }

      return {
        data,
        success: true,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /**
   * Asynchronously deletes a liked design layout from the server.
   *
   * @async
   * @function
   * @param {number} likedDesignsCollectionItemId - The ID of the liked design layout in the Liked Layouts collection.
   * @returns {Promise<{ success: boolean, data: Object }>} A Promise that resolves to an object with the success status and data returned from the server.
   *   @property {boolean} success - Indicates the success status of the operation.
   *   @property {Object} data - Data returned from the server after the deletion.
   * @throws {Error} Throws an error if there is an issue with the request or server response.
   */
  async delete(likedDesignsCollectionItemId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LIKED_LAYOUTS}/${likedDesignsCollectionItemId}`
      const params = {
        method: 'DELETE',
      }
      // Send a request to the server to delete the layout
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
        data: result,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /**
   * Get a paginated list of liked layouts for a given userId.
   * @param {string} userId - The ID of the user to be updated.
   * @returns {Promise<Object>} A promise that resolves to the updated user information.
   */
  async get({ userId, page }) {
    try {
      const query = QueryString.stringify({
        populate: {
          layout: {
            fields: ['title', 'likes', 'views', 'id', 'slug', 'link'],
            populate: {
              tags: {
                fields: ['*'],
              },
              categories: {
                fields: ['*'],
              },
              image: {
                fields: ['formats', 'height', 'name', 'url', 'width'],
              },
            },
          },
        },
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
          pageSize: PAGE_SIZE,
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LIKED_LAYOUTS}?${query}`

      const response = await authFetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()
      const { data, meta } = result

      // Extract designs
      const designs = data.map((item) => item.attributes.layout.data)

      const mappedDesigns = mapDesigns(designs)
      const mappedPagination = mapPagination(meta.pagination)

      return {
        data: {
          designs: mappedDesigns,
          pagination: mappedPagination,
        },
        success: true,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }
}
