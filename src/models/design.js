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
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
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
      fonts: [{ type: String }],
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
