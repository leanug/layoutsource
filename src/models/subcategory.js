// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

// Define the user schema
const SubcategorySchema = new Schema(
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
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true },
)

// Create and export the Category model
const Subcategory =
  models.Subcategory || mongoose.model('Subcategory', SubcategorySchema)
export default Subcategory
