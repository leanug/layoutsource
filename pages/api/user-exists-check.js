// Import the User model
import User from '@/models/user'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { email } = req.body

      // Check if a user with the provided email already exists
      const existingUser = await User.findOne({ email })

      // Return true if the user exists, false otherwise
      res.status(200).json({ exists: !!existingUser })
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
