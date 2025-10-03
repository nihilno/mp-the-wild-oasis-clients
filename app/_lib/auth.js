import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const guest = await getGuest(user.email);
        token.guestId = guest?.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.guestId = token.guestId;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
