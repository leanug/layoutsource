import { connectDB } from '@/lib/mongodb'

import Collection from '@/models/collection'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  try {
    if (req.method === 'PUT') {
      await connectDB() // Connect to MongoDB

      const { filter, update } = req.body

      // Update
      const updatedCollection = await Collection.findOneAndUpdate(
        filter,
        update,
        {
          new: true, // Return the updated document
        },
      )

      if (updatedCollection) {
        // Collection was updated successfully
        res
          .status(200)
          .json({ message: 'Collection updated', data: updatedCollection })
      } else {
        // Collection not found or not updated
        res.status(404).json({ error: 'Collection not found or not updated' })
      }
    } else {
      // Handle invalid HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error updating collectoin:', error)

    res
      .status(500)
      .json({ error: 'An error occurred while updating the collection' })
  }
}
