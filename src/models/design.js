// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

// Define the user schema
const designSchema = new Schema(
  {
    featured: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Subcategory',
        },
      ],
    },
    views: {
      type: Number,
      default: 0,
    },
    version: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
    },
    fonts: {
      type: [{ type: String }],
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    cover: {
      type: String,
    },
    tags: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
)

// Create and export the Design model
const Design = models.Design || mongoose.model('Design', designSchema)
export default Design
