import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { connectDB } from '@/lib/mongodb'
import { verifyPassword } from '@/lib/auth'
import User from '@/models/user'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        await connectDB()

        // Get user
        const user = await User.findOne({ email: credentials.email })

        // Check if user exists
        if (!user) {
          throw new Error(
            'No user found with this email address. Please verify your email or sign up for a new account.',
          )
        }

        // Check if user is valid
        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        )

        if (!isValid) {
          throw new Error(
            'Invalid email or password. Please double-check your credentials and try again.',
          )
        }

        // User is valid
        return {
          email: user.email,
          name: user.name,
          username: user.username,
          _id: user._id,
          picture: user.picture,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
}

export default NextAuth(authOptions)
