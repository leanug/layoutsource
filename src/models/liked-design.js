// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

const likedDesignSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    design: {
      type: Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
    },
  },
  { timestamps: true },
)

const LikedDesign =
  models.LikedDesign || mongoose.model('LikedDesign', likedDesignSchema)
export default LikedDesign
