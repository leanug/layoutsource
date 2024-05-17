import { connectDB } from '@/lib/mongodb'
import LikedDesign from '@/models/liked-design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Connect to MongoDB
      await connectDB()

      const { userId, designId } = req.body // Assuming categoryId is passed in the request body

      // Create a new instance of the LikedDesign model
      const newLikedDesign = new LikedDesign({
        user: userId,
        design: designId,
      })
      // Save the new liked design to the database
      const savedLikedDesign = await newLikedDesign.save()
      console.log(savedLikedDesign);
      res.status(200).json({
        newlikedDesignDocumentId: savedLikedDesign._id,
      })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error updating likes:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while updating liked designs' })
  }
}
