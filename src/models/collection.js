// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

// Define the user schema
const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    designs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Design',
        },
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    totalDesigns: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

// Create and export the Collection model
const Collection =
  models.Collection || mongoose.model('Collection', collectionSchema)
export default Collection
