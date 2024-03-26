import QueryString from 'qs'

import { checkResponse, ENV, handleError } from '@/utils'
import { Log } from './log'

const logCtrl = new Log()

export class Category {
  async getAll() {
    try {
      const sort = 'sort=order:asc'
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}?${sort}` //?populate=icon to get all the icons
      const response = await fetch(url)
      const result = await response.json()

      return {
        data: result.data,
        success: true,
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getCategoriesByType(type = 'homepages') {
    try {
      const query = QueryString.stringify({
        populate: ['title', 'slug'],
        filters: {
          type: {
            slug: {
              $eq: type,
            },
          },
        },
        sort: ['order:asc'],
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}?${query}`
      const response = await fetch(url)
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
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /**
   * Fetches a category by its slug.
   *
   * @async
   * @function
   * @param {string} slug - The slug of the category to be fetched.
   * @returns {Promise<Object>} A promise that resolves to an object with category data and success status.
   *   @property {Object} data - The category data.
   *   @property {boolean} success - Indicates the success status of the operation.
   * @throws {Error} If an error occurs during the fetch operation.
   */
  async getCategoryBySlug(slug) {
    try {
      const filters = `filters[slug][$eq]=${slug}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}?${filters}`

      const response = await fetch(url)
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }
      const result = await response.json()

      return {
        data: result.data[0],
        success: true,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }
}
