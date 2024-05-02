import { connectDB } from '@/lib/mongodb'
import Category from '@/models/category'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB()

    if (req.method === 'GET') {
      // Query all categories from the database
      const categories = await Category.find()

      // Return the categories in the response
      res.status(200).json(categories)
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error checking user existence:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while checking user existence' })
  }
}
