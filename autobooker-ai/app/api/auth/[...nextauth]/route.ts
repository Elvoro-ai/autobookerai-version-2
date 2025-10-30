import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';

const handler = NextAuth({
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };