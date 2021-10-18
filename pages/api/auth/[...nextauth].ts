import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import prisma from '../../../utils/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'

export default NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async (params) => {
      const { admin, name, id, email, image } = params.user as User
      return {
        expires: params.session.expires,
        user: {
          admin,
          name,
          id,
          email,
          image
        }
      }
    }
  }
})
