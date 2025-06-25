// i will tell you how this works
// what we do here is we are implementing NExtAuth with Google authentication
// for that we had to get google client id and secret from the google developer console
// this is mainly a work around i took for google account verification
// so that we can use the google account to login and register users

// the actual login and registration is handled by the backend
// so we are just using the google account to verify the user and then we can use the
// backend to handle the rest of the authentication process
// you will be redirected to a page called /auth/sync
// this redirection is done by the middleware
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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