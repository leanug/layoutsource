import { connectDB } from '@/lib/mongodb'
import Design from '@/models/design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Connect to MongoDB
      await connectDB()

      const { query, page = 1, limit = 10 } = req.body // Assuming categoryId is passed in the request body

      // Query designs by search query
      const designs = await Design.find({
        title: { $regex: query, $options: 'i' },
      })
        .skip((page - 1) * limit)
        .limit(limit)

      // Total items
      // Count the total number of designs matching the search query
      const totalItems = await Design.countDocuments({
        title: { $regex: query, $options: 'i' },
      })

      // Total pages
      const totalPages = Math.ceil(totalItems / limit)

      // Return the designs in the response
      res.status(200).json({ designs, totalItems, totalPages })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error fetching designs by query:', error)

    res
      .status(500)
      .json({ error: 'Error fetching designs. Please try again later.' })
  }
}
