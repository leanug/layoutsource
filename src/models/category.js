// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

// Define the user schema
const categorySchema = new Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    parentSlug: {
      type: String,
    },
  },
  { timestamps: true },
)

// Create and export the Category model
const Category = models.Category || mongoose.model('Category', categorySchema)
export default Category
