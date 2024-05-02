import { connectDB } from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'
import User from '@/models/user'
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
      const { email, password } = req.body
      // Hash the password securely
      let hashedPassword = await hashPassword(password)

      // Create a new user in the database
      const newUser = await User.create({ email, password: hashedPassword })
      // Return a success response with the newly created user
      res.status(201).json({ user: newUser })
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error registering user:', error)

    res.status(500).json({
      error: 'An error occurred while registering the user',
    })
  }
}
