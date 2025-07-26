import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { db } from "./lib/db";
import { getAccountByUserId, getUserById } from "@/features/auth/actions";

 

 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error", // Optional: create an error page
  },
  callbacks: {
    /**
     * Handle user creation and account linking after a successful sign-in
     */
    async signIn({ user, account, profile }) {
      if (!user || !account) return false;

      // For GitHub, email might be null if user has private email
      // In this case, we'll use the GitHub ID as a fallback
      let userEmail = user.email;
      
      if (!userEmail && account.provider === "github" && profile) {
        // Try to get email from profile, or create a fallback
        userEmail = (profile as any).email || `${(profile as any).login}@github.local`;
      }
      
      if (!userEmail) {
        console.error("No email available for user authentication");
        return false;
      }

      // Check if the user already exists
      const existingUser = await db.user.findUnique({
        where: { email: userEmail },
      });

      // If user does not exist, create a new one
      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: userEmail,
            name: user.name || (profile as any)?.login || "Unknown User",
            image: user.image,
           
            accounts: {
              // @ts-ignore
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: String(account.providerAccountId), // Convert to string
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
                idToken: account.id_token,
                sessionState: account.session_state,
              },
            },
          },
        });

        if (!newUser) return false; // Return false if user creation fails
      } else {
        // Link the account if user exists
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: String(account.providerAccountId), // Convert to string
            },
          },
        });

        // If the account does not exist, create it
        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: String(account.providerAccountId), // Convert to string
              refreshToken: account.refresh_token,
              accessToken: account.access_token,
              expiresAt: account.expires_at,
              tokenType: account.token_type,
              scope: account.scope,
              idToken: account.id_token,
              // @ts-ignore
              sessionState: account.session_state,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)

      if(!existingUser) return token;

      const exisitingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      // Attach the user ID from the token to the session
    if(token.sub  && session.user){
      session.user.id = token.sub
    } 

    if(token.sub && session.user){
      session.user.role = token.role
    }

    return session;
    },
  },
  
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})