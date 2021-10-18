import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import prisma from '../../../utils/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma)
})
