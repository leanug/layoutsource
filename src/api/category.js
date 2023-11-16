import { ENV } from "@/utils";
import QueryString from 'qs'

export class Category {
  async getAll () {
    try {
      const sort = 'sort=order:asc'
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }?${ sort }` //?populate=icon to get all the icons
      const response = await fetch(url)
      const result = await response.json()
      if (response.status !== 200) throw result
      return result
    } catch (error) {
      console.error(error);
    }
  }

  async getCategoriesByType (type = 'homepages') {
    try {
      const query = QueryString.stringify({
        // Use the populate parameter to fetch additional data
        populate: ['title', 'slug'],
        filters: {
          type: {
            slug: {
              $eq: type
            }
            
          }
          /* slug: { $eq: 'blog'} */
        },
        sort: ['order:asc'],
      })

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }?${ query }`
      const response = await fetch(url)
      const result = await response.json()
      
      if (response.status !== 200) {
        if(ENV.IS_DEV) {
          console.error('API request failed', result)
        }
        return null
      }

      return result
    } catch (error) {
      if(ENV.IS_DEV) {
        console.error('Error while fetching categories by type: ', error)
      }
      return null
    }
  }

  async getCategoryBySlug (slug) {
    try {
      const filters = `filters[slug][$eq]=${ slug }`
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }?${ filters }`
      const response = await fetch(url)
      const result = await response.json()
      if (response.status !== 200) throw result
      return result.data[0]
    } catch (error) {
      throw (error)
    }
  }
}