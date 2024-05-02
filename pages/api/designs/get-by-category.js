import mongoose from 'mongoose'

import Design from '@/models/design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { dataId, page = 1, limit = 1 } = req.body // Assuming categoryId is passed in the request body
      const dataIdObj = new mongoose.Types.ObjectId(dataId)

      // Query designs
      const designs = await Design.find({
        $or: [{ category: dataIdObj }, { subcategories: { $in: [dataIdObj] } }],
      })
        .skip((page - 1) * limit)
        .limit(limit)

      // Total items
      // Count the total number of designs matching the search query
      const totalItems = await Design.countDocuments({
        $or: [{ category: dataIdObj }, { subcategories: { $in: [dataIdObj] } }],
      })

      // Total pages
      const totalPages = Math.ceil(totalItems / limit)

      res.status(200).json({ designs, totalItems, totalPages })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error fetching designs by category:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while fetching designs by category' })
  }
}
