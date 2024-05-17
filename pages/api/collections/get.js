import { connectDB } from '@/lib/mongodb'

import Collection from '@/models/collection'
import { ENV, sanitizeSlug } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Connect to MongoDB
      await connectDB()

      const { userId, filterBy, slug, page = 1, limit = 1 } = req.body

      let collections = [],
        totalPages = 0,
        totalItems = 0

      if (filterBy === 'findOne') {
        // If slug is provided, search for a single collection by slug
        const safeSlug = sanitizeSlug(slug)
        collections = await Collection.findOne({ user: userId, slug: safeSlug })
      }

      if (filterBy === 'getCollectionList') {
        collections = await Collection.find({ user: userId })
      }

      if (filterBy === 'getAll') {
        // If slug is not provided, retrieve all collections for the user
        totalItems = await Collection.countDocuments({ user: userId })
        totalPages = Math.ceil(totalItems / limit)

        collections = await Collection.find({ user: userId })
          .skip((page - 1) * limit)
          .limit(limit)
      }

      res.status(200).json({ collections, totalItems, totalPages })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV)
      console.error('Error fetching collection list by user id', error)

    res
      .status(500)
      .json({ error: 'An error occurred while fetching collections' })
  }
}
