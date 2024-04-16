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
    parentCategory: {
      type: String,
    },
    subcategories: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
)

// Create and export the Category model
const Category = models.Category || mongoose.model('Category', categorySchema)
export default Category
