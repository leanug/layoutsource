import mongoose from 'mongoose'

import { connectDB } from '@/lib/mongodb'
import Design from '@/models/design'
import { ENV } from '@/utils'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Connect to MongoDB
  await connectDB()

  try {
    const { designId, updates } = req.body // Assuming categoryId is passed in the request body
    const designIdObj = new mongoose.Types.ObjectId(designId)

    const design = await Design.findByIdAndUpdate(designIdObj, updates, {
      new: true,
    })

    // Return the designs in the response
    res.status(200).json({ message: 'Design updated', design })
  } catch (error) {
    // Handle errors gracefully
    if (ENV.IS_DEV) console.error('Error updating design:', error)

    res
      .status(500)
      .json({ error: 'Error updating design. Please try again later.' })
  }
}
