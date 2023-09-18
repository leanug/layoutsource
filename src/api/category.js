import { ENV } from "@/utils";

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

  async getByType (type = 'home-page') {
    try {
      const sort = 'sort=order:asc'
      const filters = `filters[type][$eq]=${ type }`
      const urlParams = `${ sort }&${ filters }`
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }?${ urlParams }` //?populate=icon to get all the icons
      const response = await fetch(url)
      const result = await response.json()
      if (response.status !== 200) throw result
      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getBySlug (slug) {
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