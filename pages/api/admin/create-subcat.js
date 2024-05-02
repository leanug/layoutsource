import { connectDB } from '@/lib/mongodb'
import Subcategory from '@/models/subcategory'
import { ENV } from '@/utils'

/**
 * Handles user registration.
 * @param {import('next').NextApiRequest} req - The HTTP request object.
 * @param {import('next').NextApiResponse} res - The HTTP response object.
 * @returns {Promise<void>} A Promise representing the completion of the operation.
 */
export default async function handler(req, res) {
  // Connect to MongoDB
  await connectDB()

  try {
    if (req.method === 'POST') {
      const { title, parentSlug, parent, slug } = req.body

      // Create a new sub category in the database
      await Subcategory.create({
        title,
        parentSlug,
        parent,
        slug,
      })

      // Return a success response with the newly created user
      res.status(201).json({ message: 'Subcategory created' })
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
