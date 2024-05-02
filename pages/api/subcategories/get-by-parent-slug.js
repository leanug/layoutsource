import { connectDB } from '@/lib/mongodb'

import Subcategory from '@/models/subcategory'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB()

    if (req.method === 'POST') {
      const { parentSlug } = req.body

      // Query all categories from the database
      const subcategories = await Subcategory.find({ parentSlug: parentSlug })

      // Return the categories in the response
      res.status(200).json(subcategories)
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error fetching sub categories:', error)

    res.status(500).json({ error: 'Error fetching sub categories' })
  }
}
