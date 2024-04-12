// Import the mongoose library
import mongoose from 'mongoose'

// Define the MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI

let cachedConnection = null

// Function to connect to MongoDB
async function connectMongoDB() {
  if (!cachedConnection) {
    try {
      // Connect to MongoDB using Mongoose
      const connection = await mongoose.connect(MONGODB_URI)

      // Cache the connection
      cachedConnection = connection

      // Log a message upon successful connection
      console.log('Connected to MongoDB')
    } catch (error) {
      // Log any errors that occur during connection
      console.error('Error connecting to MongoDB:', error.message)
      throw error // Rethrow the error to propagate it
    }
  }
  return cachedConnection
}

// Function to disconnect from MongoDB
async function disconnectMongoDB() {
  if (cachedConnection) {
    // Close the MongoDB connection
    await cachedConnection.disconnect()

    // Log a message upon successful disconnection
    console.log('Disconnected from MongoDB')
  }
}

// Export the functions to be used in other parts of the application
export { connectMongoDB, disconnectMongoDB }
