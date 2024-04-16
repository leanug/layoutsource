// Import mongoose
import mongoose, { Schema, models } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Define the user schema
const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    role: {
      type: String,
      default: 'trial', // trial / admin / premium
    },
  },
  { timestamps: true },
)

// Function to generate a unique UUID username
const generateUniqueUsername = async () => {
  let username
  let isUsernameUnique = false
  while (!isUsernameUnique) {
    username = uuidv4().replace(/-/g, '').substring(0, 12) // Generate a UUID and remove hyphens
    const existingUser = await User.findOne({ username }) // Check if the username already exists
    isUsernameUnique = !existingUser
  }
  return username
}

// Middleware to generate a unique UUID username before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.username) {
    this.username = await generateUniqueUsername()
  }
  next()
})

// Create and export the User model
const User = models.User || mongoose.model('User', userSchema)
export default User
