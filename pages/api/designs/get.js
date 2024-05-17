import Design from '@/models/design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { filterBy = '', filterData = [], page = 1, limit = 1 } = req.body // Assuming categoryId is passed in the request body

      let filter = {}

      if (filterBy === '') filter = ''

      if (filterBy === 'catOrSubCatId') {
        filter = {
          $or: [
            { category: filterData[0] },
            { subcategories: { $in: filterData } },
          ],
        }
      }

      if (filterBy === 'likedDesigns' || filterBy === 'designId') {
        filter = { _id: { $in: filterData } }
      }

      if (filterBy === 'designSlug') {
        filter = { slug: filterData[0] }
      }

      const designs = await Design.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)

      // Count the total number of designs matching the search query
      const totalItems = await Design.countDocuments(filter)

      // Total pages
      const totalPages = Math.ceil(totalItems / limit)
      res.status(200).json({ designs, totalItems, totalPages })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error fetching designs.', error)

    res.status(500).json({
      error: 'An error occurred while fetching designs.',
    })
  }
}
