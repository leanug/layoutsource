import { connectDB } from '@/lib/mongodb'
import LikedDesign from '@/models/liked-design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Connect to MongoDB
      await connectDB()

      const { userId } = req.body // Assuming categoryId is passed in the request body

      // Query designs
      const likedDesigns = await LikedDesign.find({
        user: userId,
      }).select('design')

      res.status(200).json({ likedDesigns })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error fetching liked designs:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while fetching liked designs' })
  }
}
