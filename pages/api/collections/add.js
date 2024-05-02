import { connectDB } from '@/lib/mongodb'
import Collection from '@/models/collection'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Connect to MongoDB
      await connectDB()

      const body = JSON.parse(req.body)
      const { title, description, designs, slug, totalDesigns, user } = body // Assuming categoryId is passed in the request body

      // Create a new instance of the LikedDesign model
      const newCollection = new Collection({
        title,
        description,
        designs,
        slug,
        totalDesigns,
        user,
      })
      // Save the new liked design to the database
      const savedNewCollection = await newCollection.save()

      res
        .status(200)
        .json({ message: 'Collection created', data: savedNewCollection })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error creating collectoin:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while adding a new collection' })
  }
}
