import { ENV } from '@/utils';

export class Layout {
  async getFeaturedLayouts({ limit = 8, categoryId = null }) {
    try {
      const filters = [];
      if (categoryId) filters.push(`filters[categories][id][$eq]=${ categoryId }`);
      const featured = `filters[featured][$eq]=true`
      const paginationLimit = `pagination[limit]=${ limit }`;
      const sort = 'sort=publishedAt:desc';
      const populate = 'populate=*';

      const urlParams = filters.concat(
        featured, 
        paginationLimit, 
        sort, 
        populate)
      .join('&');
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LAYOUTS}?${ urlParams }`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Fetch layouts by category slug and page.
   *
   * @async
   * @param {Object} options - The options for fetching layouts.
   * @param {string} options.slug - The category slug to filter layouts.
   * @param {number} options.page - The page number for pagination.
   * @throws {Error} If an error occurs during the fetch or if the response status is not 200.
   * @returns {Promise<Object>} A promise that resolves to the fetched layouts.
   */
  async getLayoutsByCategory({ slug = null, page = 1 }) {
    try {
      const filters = [];
      const category = `filters[categories][slug][$eq]=${ slug }`
      const pagination = `pagination[page]=${ page }&pagination[pageSize]=1`;
      const populate = 'populate=*';

      const urlParams = filters.concat(
        category,
        pagination,
        populate
      )
      .join('&');

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ urlParams }`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }

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
  async getLayoutsByType({ type = null, page = 1 }) {
    try {
      const filters = [];
      const categoryType = `filters[categories][type][$eq]=${ type }`
      const pagination = `pagination[page]=${ page }&pagination[pageSize]=1`;
      const populate = 'populate=*';

      const urlParams = filters.concat(
        categoryType,
        pagination,
        populate
      )
      .join('&');

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ urlParams }`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }

  async searchLayouts(text, page) {
    try {
      const params = new URLSearchParams();
      params.append('filters[title][$contains]', text);
      params.append('pagination[page]', page);
      params.append('pagination[pageSize]', 30);
      params.append('populate', '*');

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ params.toString() }`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error('Error fetching layouts');
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while searching layouts');
    }
  }

  async getLayoutBySlug( layout ) {
    try {
      const filters = [];
      const slugFilter = `filters[slug][$eq]=${ layout }`
      const populate = 'populate=*';

      const urlParams = filters.concat(
        slugFilter,
        populate
      )
      .join('&');

      const url = `${ ENV.API_URL }/${ ENV.ENDPOINTS.LAYOUTS }?${ urlParams }`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error(error);
    }
  }
}
