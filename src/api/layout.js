import { 
  ENV, 
  authFetch, 
  mapDesigns, 
  mapPagination, 
  isValidSlug 
} from '@/utils';

import QueryString from 'qs'

const VALID_SORT_OPTIONS = {
  updatedAt: 'updatedAt:desc',
  views: 'views:desc',
  likes: 'likes:desc',
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
  async getDesigns({ type = 'homepages', page = 1, sortBy = 'updatedAt', category = 'all' }) {
    try {
      // Check if the provided sortBy value is a valid option; default to 'updatedAt' if not.
      const sortParam = VALID_SORT_OPTIONS[sortBy] || VALID_SORT_OPTIONS.updatedAt

      // Sanitize category
      const safeCat = category === 'all' ? 'all' : isValidSlug(category)
      
      // Define the base filters object
      const filters = {
        categories: {
          type: {
              slug: {
                  $eq: type
              }
          },
        }
      }

      // Add the additional filter for 'slug' if category is not 'all'
      if (category !== 'all') {
        filters.categories.slug = {
            $eq: safeCat
        }
      }

      const query = QueryString.stringify({
        fields: ['title', 'views', 'likes', 'slug'],
        // Use the populate parameter to fetch additional data
        populate: {
          cover: {
            fields: ['height', 'name', 'url', 'width']
          },
        },
        filters,
        sort: [sortParam],
        pagination: {
          page: page,
          pageSize: 1,
        },
      })
      
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ query }`
      const response = await fetch(url)
      const result = await response.json()
      
      if (response.status !== 200) {
        // This throw statement will stop the execution
        throw new Error('HTTP Error: ' + response.status);
      }
      
      const { data, meta } = result
      const mappedDesigns = mapDesigns(data)
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

  async searchDesigns({text, page}) {
    try {
      const query = QueryString.stringify({
        populate: {
          cover: {
            fields: ['formats', 'height', 'name', 'url', 'width']
          },
        },
        filters: {
          title: {
            $contains: text
          }
        },
        sort: ['title:asc'],
        pagination: {
          page: page,
          pageSize: 1,
        },
      })

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ query }`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error('Error fetching layouts');
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while searching layouts', error);
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
        populate: {
          categories: {
            fields: ['*']
          },
          image: {
            fields: ['formats', 'height', 'name', 'url', 'width']
          }
        },
        filters: {
          slug: {
            $eq: designSlug
          }
        }
      })

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ query }`
      const response = await fetch(url);
      const result = await response.json();
      
      if (response.status !== 200) {
        if(ENV.IS_DEV) {
          console.error('API request failed', result)
        }
        return null
      }

      return result
    } catch (error) {
      if(ENV.IS_DEV) {
        console.error('Error while fetching design: ', error)
      }
      return null
    }
  }

  async like (layoutLikes, layoutId) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }/${ layoutId }`
      const currentLikes = layoutLikes || 0; // Default to 0 if likes field is undefined
      const updatedLikes = currentLikes + 1 // Increment the likes count by one

      const params = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            likes: updatedLikes,
          }
        })
      }
      // Send a request to the server to like the layout
      const response = await authFetch(url, params);
      // Handle the response
      const result = await response.json()

      if (response.status !== 200) {
        // Handle the error here, for example, log it
        console.error('Error updating liked layout:', result);
        throw new Error('Failed to update liked layout');
      }
  
      return result.data; // Return the response data or status
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while updating a liked layout');
    }
  }

  async dislike(layoutLikes, layoutId) {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }/${ layoutId }`;
      const currentLikes = layoutLikes || 0; // Default to 0 if likes field is undefined
      const updatedLikes = Math.max(currentLikes - 1, 0) // Decrement the likes count by one
  
      const params = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            likes: updatedLikes,
          },
        }),
      };
      // Send a request to the server to dislike the layout
      const response = await authFetch(url, params);
      // Handle the response
      const result = await response.json();
  
      if (response.status !== 200) {
        // Handle the error here, for example, log it
        console.error('Error updating disliked layout:', result);
        throw new Error('Failed to update disliked layout');
      }
  
      return result.data; // Return the response data or status
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while updating a disliked layout');
    }
  }
}
