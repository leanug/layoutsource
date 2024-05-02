import { connectDB } from '@/lib/mongodb'
import Design from '@/models/design'
import { ENV } from '@/utils'

/**
 * Handles user registration.
 * @param {import('next').NextApiRequest} req - The HTTP request object.
 * @param {import('next').NextApiResponse} res - The HTTP response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await connectDB()

    if (req.method === 'POST') {
      const { title, link, slug, tags, cover, image } = req.body

      // Create a new user in the database
      await Design.create({
        title,
        link,
        slug,
        tags,
        cover,
        image,
      })

      // Return a success response with the newly created user
      res.status(201).json({ message: 'Design uploaded' })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ success: false, error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error uploading design:', error)

    res.status(500).json({
      error: 'An error occurred while uploading the design',
      success: false,
    })
  }
}
