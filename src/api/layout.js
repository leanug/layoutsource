import { ENV } from '@/utils';

export class Layout {
  async getFeaturedLayouts({ limit = 8, categoryId = null }) {
    try {
      const filters = [];
      if (categoryId) filters.push(`filters[categories][id][$eq]=${categoryId}`);
      const featured = `filters[featured][$eq]=true`
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = 'sort=publishedAt:desc';
      const populate = 'populate=*';

      const urlParams = filters.concat(
        featured, 
        paginationLimit, 
        sort, 
        populate)
      .join('&');
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }
}
