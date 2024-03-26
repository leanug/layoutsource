import QueryString from 'qs'

import {
  authFetch,
  ENV,
  handleError,
  isValidSlug,
  mapDesign,
  mapDesigns,
  mapPagination,
} from '@/utils'
import { Log } from '@/api'

const logCtrl = new Log()

const PAGE_SIZE = 4
const FEATURED_PAGE_LIMIT = 25
const VALID_SORT_OPTIONS = {
  createdAt: 'createdAt:desc',
  views: 'views:desc',
  likes: 'likes:desc',
  title: 'title:asc',
}

export class Layout {
  /**
   * Fetch designs by category type and page.
   *
   * @async
   * @param {Object} options - The options for fetching layouts.
   * @param {string} options.type - The category type to filter layouts.
   * @param {number} options.page - The page number for pagination.
   * @throws {Error} If an error occurs during the fetch.
   * @returns {Promise<Object>} A promise that resolves to the fetched layouts.
   */
  async getDesigns({
    page = 1,
    sortBy = 'updatedAt',
    tags = [],
    pageSize = PAGE_SIZE,
  }) {
    try {
      // Check if the provided sortBy value is a valid option; default to 'updatedAt' if not.
      const sortParam =
        VALID_SORT_OPTIONS[sortBy] || VALID_SORT_OPTIONS.updatedAt

      // Sanitize category
      //const safeTags = tags === 'all' ? 'all' : tags // VALIDATE!!!

      // Define the base filters object
      let tagFilters = []
      if (tags.length > 0) {
        tagFilters = tags.map((tag) => ({
          tags: {
            slug: {
              $eq: tag,
            },
          },
        }))
      }

      const query = QueryString.stringify({
        fields: ['title', 'views', 'likes', 'slug', 'link'],
        // Use the populate parameter to fetch additional data
        populate: {
          tags: {
            fields: ['*'],
          },
          image: {
            fields: ['formats', 'height', 'name', 'url', 'width'],
          },
        },
        filters: {
          $and: tagFilters,
        },
        sort: [sortParam],
        pagination: {
          page: page,
          pageSize: pageSize,
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${query}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()
      const { data, meta } = result

      const mappedDesigns = mapDesigns(data)
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

  /**
   * Get a layout by its slug from the API.
   *
   * @param {string} designSlug - The slug of the design to retrieve.
   * @returns {Promise<object|null>} - A Promise that resolves to the retrieved layout object or null if an error occurs.
   */
  async getFeatured() {
    try {
      const query = QueryString.stringify({
        fields: ['title'],
        filters: {
          featured: true,
        },
        populate: {
          image: {
            fields: ['height', 'name', 'url', 'width'],
          },
        },
        pagination: {
          limit: FEATURED_PAGE_LIMIT,
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${query}`
      const response = await fetch(url)
      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }
      const result = await response.json()

      // Map results
      const extractedData = result.data.map((item) => ({
        title: item.attributes.title,
        id: item.id,
        cover: {
          height: item.attributes.cover.data.attributes.height,
          name: item.attributes.cover.data.attributes.name,
          url: item.attributes.cover.data.attributes.url,
          width: item.attributes.cover.data.attributes.width,
        },
      }))

      return {
        success: true,
        data: extractedData,
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  async searchDesigns({ queryString, page, sortBy = 'updatedAt' }) {
    // Check if the provided sortBy value is a valid option; default to 'updatedAt' if not.
    const sortParam = VALID_SORT_OPTIONS[sortBy] || VALID_SORT_OPTIONS.updatedAt

    try {
      const query = QueryString.stringify({
        populate: {
          tags: {
            fields: ['*'],
          },
          image: {
            fields: ['formats', 'height', 'name', 'url', 'width'],
          },
        },
        filters: {
          title: {
            $contains: queryString,
          },
        },
        sort: [sortParam],
        pagination: {
          page: page,
          pageSize: PAGE_SIZE,
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${query}`
      const response = await fetch(url)
      const result = await response.json()

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const { data, meta } = result
      const mappedDesigns = mapDesigns(data)
      const mappedPagination = mapPagination(meta.pagination)

      return {
        success: true,
        data: {
          designs: mappedDesigns,
          pagination: mappedPagination,
        },
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  /**
   * Get a layout by its slug from the API.
   *
   * @param {string} designSlug - The slug of the design to retrieve.
   * @returns {Promise<object|null>} - A Promise that resolves to the retrieved layout object or null if an error occurs.
   */
  async getDesignBySlug(designSlug) {
    try {
      const query = QueryString.stringify({
        fields: ['title', 'link', 'likes', 'slug', 'views', 'updatedAt'],
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
        filters: {
          slug: {
            $eq: designSlug,
          },
        },
      })

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${query}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      const result = await response.json()
      const mappedDesign = mapDesign(result.data[0])

      return {
        success: true,
        data: { design: mappedDesign },
      }
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  async like(layoutLikes, layoutId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}/${layoutId}`
      const currentLikes = layoutLikes || 0 // Default to 0 if likes field is undefined
      const updatedLikes = currentLikes + 1 // Increment the likes count by one

      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            likes: updatedLikes,
          },
        }),
      }
      // Send a request to the server to like the layout
      const response = await authFetch(url, params)
      // Handle the response
      const result = await response.json()

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      return result.data // Return the response data or status
    } catch (error) {
      return handleError(error, logCtrl)
    }
  }

  async dislike(layoutLikes, layoutId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}/${layoutId}`
      const currentLikes = layoutLikes || 0 // Default to 0 if likes field is undefined
      const updatedLikes = Math.max(currentLikes - 1, 0) // Decrement the likes count by one

      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            likes: updatedLikes,
          },
        }),
      }
      // Send a request to the server to dislike the layout
      const response = await authFetch(url, params)
      // Handle the response
      const result = await response.json()

      if (!response.ok) {
        const errorData = await response.json()
        throw {
          message: errorData?.error?.message || 'Unexpected error',
          status: response.status,
        }
      }

      return result.data // Return the response data or status
    } catch (error) {
      console.error(error)
      return handleError(error, logCtrl)
    }
  }
}
