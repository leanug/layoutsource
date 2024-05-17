import { connectDB } from '@/lib/mongodb'
import LikedDesign from '@/models/liked-design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'DELETE') {
      // Connect to MongoDB
      await connectDB()

      const { filter } = req.body
      const { _id } = filter

      // Create a new instance of the LikedDesign model
      await LikedDesign.findByIdAndDelete({ _id })

      res.status(200).json({ message: 'Liked design deleted' })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error deleting liked design:', error)

    res.status(500).json({ error: 'An error occurred while deleting.' })
  }
}
