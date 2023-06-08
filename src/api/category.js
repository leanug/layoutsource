import { ENV } from "@/utils";

export class Category {
  async getAll() {
    try {
      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.CATEGORY }` //?populate=icon to get all the icons
      const response = await fetch(url)
      const result = await response.json()
      if (response.status !== 200) throw result
      return result
    } catch (error) {
      console.error(error);
    }
  }
}