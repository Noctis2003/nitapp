
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {



    async signIn({ user, account, profile }) {
   
     console.log("User:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      return true;
    },

    async jwt({ token, user}) {
    
    if (user) {
    
      token.email = user.email;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
    
      if (session.user) {
        session.user.email = token.email;
      }
    }
    return session;
  }

  }
});

export { handler as GET, handler as POST };